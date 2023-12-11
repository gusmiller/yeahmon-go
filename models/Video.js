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
const Response = require('./Response');

// Schema to create Post model
const videoSchema = new Schema(
     {
          published: {
               type: Boolean,
               default: false,
          },
          createdAt: {
               type: Date,
               default: Date.now,
          },
          advertiserFriendly: {
               type: Boolean,
               default: true,
          },
          description: {
               type: String,
               minLength: 15,
               maxLength: 500,
          },
          responses: [Response],
     },
     {
          toJSON: {
               virtuals: true,
          },
          id: false,
     }
);

// Initialize our Video model
const Video = model('video', videoSchema);

module.exports = Video;
