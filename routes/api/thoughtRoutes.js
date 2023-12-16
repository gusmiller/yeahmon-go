/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under GNU General Public License
 * Assignment # 18 - Mongoose Social Network API
 * 
 * Date : 12/12/2023 5:39:22 PM
 * gustavo.miller@miller-hs.com 
 * 
 * router.route('/').get(getAll).post(newOne); replaces all this
 *        router.get('/', getAll);
 *        router.post('/', newOne);
 *******************************************************************/
const router = require('express').Router();
const { getAll, getSingle, newOne, deleteThought, updateThought } = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getAll).post(newOne);

// /api/thoughts/:Id
router.route('/:Id')
     .get(getSingle)
     .delete(deleteThought)
     .put(updateThought);

module.exports = router;
