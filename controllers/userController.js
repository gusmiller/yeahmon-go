/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under GNU General Public License
 * Assignment # 18 - Mongoose Social Network API
 * 
 * Date : 12/08/2023 14:01:28 PM
 * gustavo.miller@miller-hs.com 
 * 
 * Important Note: when requiring the models use the name exported in
 * the index.js of the models folder.
 *******************************************************************/
const { Schema } = require('mongoose');
const { User, Thought } = require('../models');
const { schema } = require('../models/User');

module.exports = {
     async getAll(req, res) {
          try {
               const data = await User.find();
               res.json(data);
          } catch (error) {
               res.status(500).json(error);
          }
     },
     async getSingle(req, res) {
          try {
               const data = await User.findOne({ _id: req.params.userId })
                    .select('-__v');

               if (!data) {
                    return res.status(404).json({ message: 'No user with such ID' });
               }

               res.json(data);
          } catch (error) {
               res.status(500).json(error);
          }
     },
     async newUser(req, res) {
          try {
               // Validation: verify the user account already exists
               const exists = await User.findOne({ username: req.body.username });
               if (exists !== null) {
                    return res.status(404).json({ message: `User already exist! ${exists._id}` });
               };

               const dbData = await User.create(req.body);
               res.json(dbData);

          } catch (error) {
               res.status(500).json(error);
          }
     },
     /**
      * Removing a friend form users profile is a bit simpler than adding one.
      * @param {*} req contains the json object with the friends and the source to update
      * @param {*} res 
      * @returns 
      */
     async removeFriend(req, res) {
          try {

               // Validation: verify the Friend user account exists
               const friendData = await User.findOne({ _id: req.params.friendId });
               if (!friendData) {
                    return res.status(404).json({ message: 'We need valid friend user ID' });
               };

               // Verify the Source user account exists
               const sourceUser = await User.findOne({ _id: req.params.userId });
               if (!sourceUser) {
                    return res.status(404).json({ message: 'We need valid destination user ID' });
               };
               // End-of-validation

               // we use the method find to retrieve all records that could possibly match the conditionals
               // but since we are being very specific it should return only 1
               const condition = await User.find({ friends: req.params.friendId, _id: req.params.userId });
               if (condition.length === 0) {
                    return res.status(404).json(
                         {
                              message: `${friendData.username} is not friends with ${sourceUser.username}! Cannot delete!`
                         });
               };

               // Validation passed - we remove the friend
               sourceUser.friends.pull(req.params.friendId);
               await sourceUser.save();

               res.json(sourceUser);

          } catch (error) {
               res.status(500).json(error.message);
          }
     },
     /**
      * Adding a new friend, it's a complicated process. Since we need to validate first that the user 
      * has not already been added as a friend. Validation should check on this and make sure we have 
      * no duplications
      * @param {*} req contains the json object with the friends and the source to update
      * @param {*} res 
      * @returns 
      */
     async addFriend(req, res) {
          try {

               // Validation: verify the Friend user account exists
               const friendData = await User.findOne({ _id: req.params.friendId });
               if (!friendData) {
                    return res.status(404).json({ message: 'We need valid friend user ID' });
               };

               // Verify the Source user account exists
               const sourceUser = await User.findOne({ _id: req.params.userId });
               if (!sourceUser) {
                    return res.status(404).json({ message: 'We need valid destination user ID' });
               };
               // End-of-validation

               // we use the method find to retrieve all records that could possibly match the conditionals
               // but since we are being very specific it should return only 1
               const condition = await User.find({ friends: req.params.friendId, _id: req.params.userId });
               if (condition.length === 1) {
                    return res.status(404).json({ message: `${friendData.username} is already friends with ${sourceUser.username}!` });
               };

               // Validation passed - we add the friend
               sourceUser.friends.push(req.params.friendId);
               await sourceUser.save();

               res.json(sourceUser);

          } catch (error) {
               res.status(500).json(error.message);
          }
     },
     /**
      * This method in the users controller will update a given user id with
      * new data passed in the parameters. Question what if I pass a empty
      * thoughts or friends arrays? would this overwrite the existing ones.  
      * Perhaps this validation is outside the scpo of this excercise.
      * 
      * @param {object} req contains the json object with the fields to update
      * @param {*} res 
      */
     async updateUser(req, res) {

          try {

               const data = await User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $set: req.body },
                    { runValidators: true, new: true }
               );

               if (!data) {
                    res.status(404).json({ message: 'No such user found!' });
               }
               res.json(data);

          } catch (error) {
               res.status(500).json(error.message);
          }
     },
     /**
      * The delete user and the user's controller will take care of removing a user from the mongoDB 
      * NoSQL database. It will also delete all of the thoughts thes user may have.
      * @param {object} req contains the json user ID that needs to be removed.
      * @param {*} res 
      * @returns 
      */
     async deleteUser(req, res) {
          try {
               const data = await User.findOne({ _id: req.params.userId });
               const dbData = await User.findOneAndRemove({ _id: req.params.userId });

               if (!dbData) { return res.status(404).json({ message: 'No user found!' }); }

               await Thought.deleteMany({ username: data.username });

               res.json({ message: 'User successfully deleted!' });
          } catch (err) {
               res.status(500).json(err);
          }
     },
};