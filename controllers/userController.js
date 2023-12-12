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
                    return res.status(404).json({ message: 'No user with such user ID' });
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
};
