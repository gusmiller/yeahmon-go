/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under GNU General Public License
 * Assignment # 18 - Mongoose Social Network API
 * 
 * Date : 12/08/2023 14:01:28 PM
 * gustavo.miller@miller-hs.com 
 *******************************************************************/
const { json } = require('express');
const connection = require('../config/connection');
const { User, Thought } = require('../models');
const Thoughts = require('../models/Thought');
const { users, thoughts } = require('./data');

connection.on('error', (err) => err);

async function createUser(value) {

     const user = await User.findOne()
          .where('email').equals(value.username)
          .exec((err, result) => {
               if (err) {
                    console.error(err);
               } else {
                    console.log(result);
               }
          });

     await Thoughts.insertOne({ "thoughtText": value.Thought, "username": user.id });
     return userId;
}

connection.once('open', async () => {
     // Delete the collections if they exist
     let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
     if (thoughtsCheck.length) {
          await connection.dropCollection('thoughts');
     }

     let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
     if (userCheck.length) {
          await connection.dropCollection('users');
     }

     await User.insertMany(users);

     // thoughts.forEach(thought => {
     //      createUser(thought);
     // });

     console.info('Seeding complete! 🌱');
     process.exit(0);
});
