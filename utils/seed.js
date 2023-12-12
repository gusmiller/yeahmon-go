/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under GNU General Public License
 * Assignment # 18 - Mongoose Social Network API
 * 
 * Date : 12/08/2023 14:01:28 PM
 * gustavo.miller@miller-hs.com 
 *******************************************************************/
const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { users } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
     console.log('connected');
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
     
     console.info('Seeding complete! 🌱');
     process.exit(0);
});
