/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under GNU General Public License
 * Assignment # 18 - Mongoose Social Network API
 * 
 * Date : 12/08/2023 14:01:28 PM
 * gustavo.miller@miller-hs.com 
 *******************************************************************/
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const messages = require("./utils/formatter");
const dic = require("./utils/queries");

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

messages.figletMsg("Carleton U");
messages.figletMsg("Mongoose Network");         

db.once('open', () => {
     app.listen(PORT, () => {
          messages.msg(dic.messages.databasename, process.env.DB_NAME);
          messages.msg(dic.messages.apirunning + PORT);
     });
});
