/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under GNU General Public License
 * Assignment # 18 - Mongoose Social Network API
 * 
 * Date : 12/08/2023 14:01:28 PM
 * gustavo.miller@miller-hs.com 
 *******************************************************************/
const User = require('../models/User');

module.exports = {
     async getUsers(req, res) {
          try {
               const users = await User.find();
               res.json(users);
          } catch (err) {
               res.status(500).json(err);
          }
     },
     async getSingleUser(req, res) {
          try {
               const user = await User.findOne({ _id: req.params.userId })
                    .select('-__v');

               if (!user) {
                    return res.status(404).json({ message: 'No user with that ID' });
               }

               res.json(user);
          } catch (err) {
               res.status(500).json(err);
          }
     },
     // create a new user
     async createUser(req, res) {
          try {
               const dbUserData = await User.create(req.body);
               res.json(dbUserData);
          } catch (err) {
               res.status(500).json(err);
          }
     },
};
