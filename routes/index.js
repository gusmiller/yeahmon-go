/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under GNU General Public License
 * Assignment # 18 - Mongoose Social Network API
 * 
 * Date : 12/08/2023 14:01:28 PM
 * gustavo.miller@miller-hs.com 
 *******************************************************************/
const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;