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
const { users, thoughts, friends } = require('./data');

connection.on('error', (err) => err);

async function createFrients() {

     for (let i = 0; i < friends.length; i++) {
          const friend = await User.findOne({ username: friends[i].friend })
          await User.findOneAndUpdate(
               { username: thoughts[i].username },
               { $push: { friends: friend._id } },
               { new: true }
          );
     }
}

async function createThoughts() {

     for (let i = 0; i < thoughts.length; i++) {
          const newThought = await Thoughts.create(
               { "thoughtText": thoughts[i].thoughtText, "username": thoughts[i].username }
          );

          const user = await User.findOneAndUpdate(
               { username: thoughts[i].username },
               { $push: { thoughts: newThought._id } },
               { new: true }
          );
     };
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
     await createThoughts();
     await createFrients();

     console.info('Seeding complete! 🌱');
     process.exit(0);
});