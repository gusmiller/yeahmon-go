/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under GNU General Public License
 * Assignment # 18 - Mongoose Social Network API
 * 
 * Date : 12/9/2023 9:50:57 AM
 * gustavo.miller@miller-hs.com 
 * 
 * Description :
 * This file contains global messages used throughout the entire system.
 *****************************************************************************/
const chalk = require("chalk");

const messages = {
     appname: chalk.bgRed("Carleton Universty Coding Bootcamp"),
     databaseconnected: chalk.bgGreen("Database connected!"),
     databaseseeded: chalk.bgGreen("Users table has been seeded"),
     listeningdata: chalk.bgGreen('----- LISTENING PLEASE USE YOUR INSOMNIA TO VALIDATE -----'),
}
module.exports = { sql, messages };