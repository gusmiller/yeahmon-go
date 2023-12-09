/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under GNU General Public License
 * Assignment # 18 - Mongoose Social Network API
 * 
 * Date : 12/08/2023 14:01:28 PM
 * gustavo.miller@miller-hs.com 
 *******************************************************************/
require('dotenv').config();
const { connect, connection } = require('mongoose');

connect(process.env.DB_HOST + process.env.DB_NAME);

module.exports = connection;