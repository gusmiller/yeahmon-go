/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under Apache License
 * Assignment #13 - Object-Relational Mapping (ORM): 
 * E-Commerce Back End
 * 
 * Date : 10/31/2023 6:01:53 AM
 * 
 * Description :
 * This file is used to execute helper functions available to the 
 * formatting of the terminal
 *******************************************************************/
const figlet = require("figlet");
const chalk = require('chalk');
const dic = require("./queries");

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * This function shows at startup it is a welcome sort of screen that shows
 * on the console. Nothing here is important.
 */
function apiendpoints() {

     msg(chalk.green('Server is ready to serve website:'), null, true);
     msg(chalk.white('     Test your API using your favorite tool'), null, false);
     msg(chalk.white(`Database Name : ${process.env.DB_NAME}`), null, false);
     msg(chalk.white(`Credentials   : gustavo.miller@miller-hs.com`), null, false);
     msg(chalk.white(`Date          : ${new Date().toLocaleString()}`));

     msg(msg(dic.messages.listeningdata), null, null, 80);

}

/**
 * This function will display a message using figlet npm package that makes funny 
 * slogans
 * @param {string} message to figlet
 */
function figletMsg(message) {
     figlet(message, function (err, data) {
          if (err) {
               console.log("Something went wrong...");
               console.dir(err);
               return;
          }
          console.log(data);
     });
}

/**
 * This function will format a chalk message to be displayed on the terminal.
 * @param {string} value - message to display
 * @param {string} add - trail message
 * @param {boolean} blankline - true/false to leave a blank line
 * @param {integet} sizestring - line size
 * @returns 
 */
function msg(value, add, blankline, sizestring) {
     if (value === undefined) {
          console.log("");
          return;
     }

     if (sizestring === undefined || value.length > sizestring) { sizestring = 140 };

     // Validate for chalk colors
     if (value.lastIndexOf("39m") || value.lastIndexOf("49m")) {
          let firstthree = value.substring(0, 5); // Retrieve the first 3 characters
          let lastfive = value.substring(value.length - 5); // Get the last portion

          let newvalue = value.substring(5); // Remove chalk characters
          newvalue = newvalue.slice(0, -5);

          // validate additional information to be added into the message. This will basically
          // inject the tail message to inherit the color
          if (add !== undefined && add !== null) {
               newvalue += add;
          }

          const padding = " ".repeat(sizestring - newvalue.length); // Build the fixed length string
          console.log(firstthree + newvalue + padding + lastfive); // Put message all back togeher 
     } else {
          console.log(value);
     }

     if (blankline === undefined || blankline === null) { console.log(""); }

     return;
}

module.exports = { msg, apiendpoints, figletMsg };