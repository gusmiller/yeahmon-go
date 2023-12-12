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
const { getAll, getSingle, newUser } = require('../../controllers/userController');

// /api/users
router.route('/').get(getAll).post(newUser);

// /api/users/:userId
router.route('/:userId').get(getSingle);

module.exports = router;