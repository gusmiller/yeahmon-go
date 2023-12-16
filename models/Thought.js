/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under GNU General Public License
 * Assignment # 18 - Mongoose Social Network API
 * 
 * Date : 12/11/2023 6:51:31 PM
 * gustavo.miller@miller-hs.com 
 *******************************************************************/
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')
const validate = require('mongoose-validator');
const date = require('date-and-time');

const nameValidator = [
     validate({
          validator: 'isLength',
          arguments: [1, 280],
          message: 'Thought should be between 1 and 280 characters'
     })
];

// Schema to create a data model - I did not used an specific name since we use
// it on each model and we can reuse the code (well, copy-paste-new)
const dataSchema = new Schema(
     {
          thoughtText: { type: String, require: true, validate: nameValidator },
          createdAt: { type: Date, default: Date.now },
          username: { type: String, require: true },
          reactions: [reactionSchema],
     },
     { toJSON: { getters: true, virtuals: true }, id: false });

// Format date using a virtual prop. We should use a date library to configure
// how date should be configured.
dataSchema.virtual('formattedDT').get(function () {
     return date.format(this.createdAt, 'ddd, MMM DD YYYY'); // Date to Locale
});

// Initialize our User model
const Thoughts = model('thought', dataSchema);

module.exports = Thoughts;