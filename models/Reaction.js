/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under GNU General Public License
 * Assignment # 18 - Mongoose Social Network API
 * 
 * Date : 12/11/2023 7:59:18 PM
 * gustavo.miller@miller-hs.com 
 *******************************************************************/
const { Schema } = require('mongoose');
const validate = require('mongoose-validator');

const nameValidator = [
     validate({
          validator: 'isLength',
          arguments: [1, 280],
          message: 'Name should be between 1 and 280 characters'
     })
];

// Schema to create a data model - I did not used an specific name since we use
// it on each model and we can reuse the code (well, copy-paste-new)
const dataSchema = new Schema(
     {
          reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
          reactionBody: { type: String, require: true, validate: nameValidator },
          username: { type: String, require: true },
          createdAt: { type: Date, default: Date.now },
     });

// Format date using a virtual prop. We should use a date library to configure
// how date should be configured.
dataSchema.virtual('formattedDT').get(function () {
     return this.createdAt.toLocaleString(); // Date to Locale
});

module.exports = dataSchema;