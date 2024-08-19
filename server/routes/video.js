const express = require("express");
const router = express.Router();
const Video = require("../models/video");
const conn = require("../models/cons");
const Grid = require('gridfs-stream');
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
const mongoose = require("mongoose");
const path = require('path'); // Added path module

let gfs;

// Initialize GridFS
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Storage configuration
const storage = new GridFsStorage({
    url: 'mongodb://localhost:27017/video',
    file: (req, file) => { // Corrected parameter from res to file
        return {
            filename: 'file_' + Date.now() + path.extname(file.originalname),
            bucketName: 'uploads',
        };
    }
});

const upload = multer({ storage });

router.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
  });

router.post('/upload', upload.single('videoFile'), async (req, res) => {
    const { title } = req.body;
    const newVideo = new Video({
        title,
        videoFile: req.file.filename,
    });
    await newVideo.save();
    res.json({ message: 'Video uploaded successfully' });
});

router.get('/videos', async (req, res) => {
    const videos = await Video.find();
    res.json(videos);
});

router.get('/video/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({ err: 'No such file exists' });
        }

        if (file.contentType === 'video/mp4' || file.contentType === 'video/webm') {
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({ err: 'Not a video' });
        }
    });
});

module.exports = router;
