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
const userSchema = new Schema(
     {
          first: String,
          last: String,
          age: Number,
          videos: [
               {
                    type: Schema.Types.ObjectId,
                    ref: 'video',
               },
          ],
     },
     {
          // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
          // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
          toJSON: {
               virtuals: true,
          },
          id: false,
     }
);

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema
     .virtual('fullName')
     // Getter
     .get(function () {
          return `${this.first} ${this.last}`;
     })
     // Setter to set the first and last name
     .set(function (v) {
          const first = v.split(' ')[0];
          const last = v.split(' ')[1];
          this.set({ first, last });
     });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
