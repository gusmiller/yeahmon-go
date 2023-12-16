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
               const dbData = await User.create(req.body);
               res.json(dbData);
          } catch (error) {
               res.status(500).json(error);
          }
     },
     /**
      * Adding a new friend, it's a complicated process. Since we need to validate first that the user 
      * has not already been added as a friend. Validation should check on this and make sure we have 
      * no duplications
      * @param {*} req 
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

               // This code will attempt to find whether user is already friends with the person trying to be added.
               const exists = User.findOne({ 'friends': req.params.friendId })
               if (exists) {
                    return res.status(404).json({ message: `Friend already exists in ${sourceUser.username} account` });
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
                    { _id: req.params.Id },
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