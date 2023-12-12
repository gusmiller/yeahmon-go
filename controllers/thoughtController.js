/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under GNU General Public License
 * Assignment # 18 - Mongoose Social Network API
 * 
 * Date : 12/12/2023 5:25:01 PM
 * gustavo.miller@miller-hs.com 
 *******************************************************************/
const Thouhgts = require('../models/Thought');

module.exports = {
     async getAll(req, res) {
          try {
               const data = await Thouhgts.find();
               res.json(data);
          } catch (error) {
               res.status(500).json(error);
          }
     },
     async getSingle(req, res) {
          try {
               const data = await Thouhgts.findOne({ _id: req.params.thought_id })
                    .select('-__v');
               if (!data) {
                    return res.status(404).json({ message: 'There is no thought such ID' });
               }

               res.json(data);
          } catch (error) {
               res.status(500).json(error);
          }
     },
     async newOne(req, res) {
          try {
               const dbData = await Thouhgts.create(req.body);
               res.json(dbData);
          } catch (error) {
               res.status(500).json(error);
          }
     },
};