/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under GNU General Public License
 * Assignment # 18 - Mongoose Social Network API
 * 
 * Date : 12/08/2023 14:01:28 PM
 * gustavo.miller@miller-hs.com 
 *******************************************************************/
const { Schema, model } = require('mongoose');

// Schema to create User model
const dataSchema = new Schema(
     {
          username: { type: String, trim: true, unique: true, require: true },
          email: { type: String, require: true },
          thoughts: [
               {
                    type: Schema.Types.ObjectId,
                    ref: 'thought',
               },
          ],
          friends: [
               {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
               },
          ],
     }
);

// Initialize our User model
const Users = model('user', dataSchema);

module.exports = Users;
