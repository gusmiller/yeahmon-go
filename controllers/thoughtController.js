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
                    return res.status(404).json({ message: 'There is no thought such ID' });
               }

               res.json(data);
          } catch (error) {
               res.status(500).json(error.message);
          }
     },
     async newOne(req, res) {
          try {
               const dbData = await Thought.create(req.body);

               const user = await User.findOneAndUpdate(
                    { username: dbData.username },
                    { $push: { Thought: dbData._id } },
                    { new: true }
               );

               res.json(dbData);

          } catch (error) {
               res.status(500).json(error.message);
          }
     },
     /**
      * This method in the Thought controller will update a given user id with
      * new data passed in the parameters. Question what if I pass a empty
      * thoughts array? would this overwrite the existing ones.
      * Perhaps this validation is outside the scpo of this excercise.
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
                    res.status(404).json({ message: 'No such thought found!' });
               }

               res.json(data);

          } catch (error) {
               res.status(500).json(error.message);
          }
     },
     /**
      * The delete thouhgt and the thoughts controller will take care of removing a user from the mongoDB 
      * NoSQL database. It will also find the owne of the thought and delete it, or shoul I say remove 
      * from the array
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
                    return res.status(404).json({ message: 'Not able to find thought in user ID' });
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