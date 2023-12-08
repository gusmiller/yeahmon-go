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
const {
     getVideos,
     getSingleVideo,
     createVideo,
     updateVideo,
     deleteVideo,
     addVideoResponse,
     removeVideoResponse,
} = require('../../controllers/videoController');

// /api/videos
router.route('/').get(getVideos).post(createVideo);

// /api/videos/:videoId
router
     .route('/:videoId')
     .get(getSingleVideo)
     .put(updateVideo)
     .delete(deleteVideo);

// /api/videos/:videoId/responses
router.route('/:videoId/responses').post(addVideoResponse);

// /api/videos/:videoId/responses/:responseId
router.route('/:videoId/responses/:responseId').delete(removeVideoResponse);

module.exports = router;
