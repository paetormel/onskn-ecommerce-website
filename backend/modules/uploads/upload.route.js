const express = require('express');
const router = express.Router();

const upload = require('../../middlewares/multer.middleware');
const { uploadImages } = require('./upload.controller');

router.post(
    '/',
    upload.array('images', 5),
    uploadImages
);

module.exports = router;