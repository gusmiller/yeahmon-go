/*******************************************************************
 * Carleton Bootcamp - 2023
 * Copyright 2023 Gustavo Miller
 * Licensed under GNU General Public License
 * Assignment # 18 - Mongoose Social Network API
 * 
 * Date : 12/12/2023 5:25:01 PM
 * gustavo.miller@miller-hs.com 
 * 
 * Important Note: when requiring the models use the name exported in
 * the index.js of the models folder.
 *******************************************************************/
const { User, Thought } = require('../models');

module.exports = {
     async getAll(req, res) {
          try {
               const data = await Thought.find();
               res.json(data);
          } catch (error) {
               res.status(500).json(error);
          }
     },
     async getSingle(req, res) {
          try {
               const data = await Thought.findOne({ _id: req.params.Id })
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
               const dbData = await Thought.create(req.body);

               const user = await User.findOneAndUpdate(
                    { username: dbData.username },
                    { $push: { Thought: dbData._id } },
                    { new: true }
               );

               res.json(dbData);

          } catch (error) {
               res.status(500).json(error);
          }
     },
     async deleteThought(req, res) {
          try {

               const owner = await Thought.findOne({ _id: req.params.Id }); // Find the thought first
               const userdata = await User.updateOne(
                    { username: owner.username },
                    { $pull: { thoughts: req.params.Id } },
                    { new: true }
               ); // Find the user with the Thought username and pull it out of the array.

               if (userdata.confirmed === false) {
                    return res.status(404).json({ message: 'Not able to find thought in user ID' });
               }

               // Delete the thought now
               const dbData = await Thought.findOneAndRemove({ _id: req.params.Id });
               if (!dbData) { return res.status(404).json({ message: 'No Thought found!' }); }

               res.json({ message: 'Thought has been successfully deleted!' });

          } catch (err) {
               res.status(500).json(err);
          }
     },
};