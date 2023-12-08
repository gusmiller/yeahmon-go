/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under GNU General Public License
 * Assignment # 18 - Mongoose Social Network API
 * 
 * Date : 12/08/2023 14:01:28 PM
 * gustavo.miller@miller-hs.com 
 *******************************************************************/
const { Schema, Types } = require('mongoose');

const responseSchema = new Schema(
     {
          reactionId: {
               type: Schema.Types.ObjectId,
               default: () => new Types.ObjectId(),
          },
          responseBody: {
               type: String,
               required: true,
               maxlength: 280,
          },
          username: {
               type: String,
               required: true,
          },
          createdAt: {
               type: Date,
               default: Date.now,
          },
     },
     {
          toJSON: {
               getters: true,
          },
          id: false,
     }
);

module.exports = responseSchema;
