/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under GNU General Public License
 * Assignment # 18 - Mongoose Social Network API
 * 
 * Date : 12/12/2023 5:25:01 PM
 * gustavo.miller@miller-hs.com 
 * 
 * Important Note: when requiring the models use the name exported in
 * the index.js of the models folder.
 *******************************************************************/
const { mongoose, Schema } = require('mongoose');
const { User, Thought } = require('../models');

module.exports = {
     async getAll(req, res) {
          try {
               const data = await Thought.find();
               res.json(data);
          } catch (error) {
               res.status(500).json(error);
          }
     },
     async getSingle(req, res) {
          try {
               const data = await Thought.findOne({ _id: req.params.Id })
                    .select('-__v');
               if (!data) {
                    return res.status(404)
                         .json({ message: 'There is no thought such ID' });
               }

               res.json(data);
          } catch (error) {
               res.status(500).json(error.message);
          }
     },
     /**
      * The new thoughts API route will create a new thought in the database. But it 
      * will validate first that thought does not belong to someone else before its 
      * created. Additionally it will run the validations added to the model - 
      * Object Data Modeling (ODM).
      * @param {*} req contains the json object with the new thought to add
      * @param {*} res 
      * @returns 
      */
     async newOne(req, res) {
          try {

               const exists = await Thought.findOne({ thoughtText: req.body.thoughtText });
               if (exists) {
                    return res.status(404).json({ message: `Thought already taken by ${exists.username} account` });
               }

               const dbData = await Thought.create(req.body);

               const user = await User.findOneAndUpdate(
                    { username: dbData.username },
                    { $push: { thoughts: dbData._id } },
                    { runValidators: true, new: true }
               );

               res.json(dbData);

          } catch (error) {
               res.status(500).json(error.message);
          }
     },
     /**
      * This method in the Thought controller will update a given user id with new data passed in 
      * the parameters. Question what if I pass a empty thoughts array? would this overwrite the 
      * existing ones. Perhaps this validation is outside the scope of this excercise.
      * 
      * @param {object} req contains the json object with the fields to update
      * @param {*} res 
      */
     async updateThought(req, res) {
          try {

               const data = await Thought.findOneAndUpdate(
                    { _id: req.params.Id },
                    { $set: req.body },
                    { runValidators: true, new: true }
               );

               if (!data) {
                    res.status(404)
                         .json({ message: 'No such thought found!' });
               }

               res.json(data);

          } catch (error) {
               res.status(500).json(error.message);
          }
     },
     /**
      * The route add reactions will add a users response to a thought or reflection. 
      * The is a validation in this module to ensure the same user is not sending the 
      * same reaction again. As many people can have the same reaction.
      * @param {*} req contains the json Thought ID in where a reaction will be added
      * @param {*} res 
      */
     async addReaction(req, res) {
          try {

               const condition = await Thought.find({
                    _id: req.params.thoughtId,
                    reactions: {
                         $elemMatch: {
                              reactionBody: req.body.reactionBody,
                              username: req.body.username
                         }
                    }
               });

               if (condition.length === 1) {
                    return res.status(404)
                         .json({ message: 'You have already post that reaction!' });
               }

               const thought = await Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    { $addToSet: { reactions: req.body } },
                    { runValidators: true, new: true }
               );

               if (!thought) {
                    return res.status(404)
                         .json({ message: 'No such thought found!' });
               }

               res.json(thought);

          } catch (error) {
               res.status(500).json(error);
          }
     },
     /**
      * This controller route will eliminate a reaction assigned to a thought, there is no
      * validation requiered here as we just delete if anything is found.
      * @param {*} req parameters are passed throught the request object under parameters
      * @param {*} res 
      * @returns 
      */
     async removeReaction(req, res) {
          try {

               const exists = await Thought.findOne({ _id: req.params.thoughtId });
               if (!exists) {
                    return res.status(404).json({ message: `No such Thought with ID: ${req.params.thoughtId} found` });
               }

               const thought = await Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    { $pull: { reactions: { reactionId: req.params.reactionId } } },
                    { new: true }
               );

               if (!thought) {
                    return res.status(404)
                         .json({ message: 'No such thought found!' });
               }

               res.json(thought);

          } catch (err) {
               res.status(500).json(err);
          }
     },
     /**
      * The delete thouhgt and the thoughts controller will take care of removing a user 
      * from the mongoDB NoSQL database. It will also find the owne of the thought and 
      * delete it, or shoul I say remove from the array
      * @param {object} req contains the json user ID that needs to be removed.
      * @param {*} res 
      * @returns 
      */
     async deleteThought(req, res) {
          try {

               const owner = await Thought.findOne({ _id: req.params.Id }); // Find the thought first
               const userdata = await User.updateOne(
                    { username: owner.username },
                    { $pull: { thoughts: req.params.Id } },
                    { new: true }
               ); // Find the user with the Thought username and pull it out of the array.

               if (userdata.confirmed === false) {
                    return res.status(404)
                         .json({ message: 'Not able to find thought in user ID' });
               }

               // Delete the thought now
               const dbData = await Thought.findOneAndRemove({ _id: req.params.Id });
               if (!dbData) { return res.status(404).json({ message: 'No Thought found!' }); }

               res.json({ message: 'Thought has been successfully deleted!' });

          } catch (error) {
               res.status(500).json(error.message);
          }
     },
};