const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Video = require('../models/video'); // Your Video model

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory where files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, 'file_' + Date.now() + path.extname(file.originalname)); // Custom filename
    }
});

const upload = multer({ storage });

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Route to handle video upload
router.post('/upload', upload.single('videoFile'), async (req, res) => {
    try {
        const { title } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const newVideo = new Video({
            title,
            videoFile: req.file.filename,
        });

        await newVideo.save();
        res.json({ message: 'Video uploaded successfully', video: newVideo });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading video', error });
    }
});

// Route to get all videos
router.get('/videos', async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching videos', error });
    }
});

// Route to stream video by filename
router.get('/video/:filename', (req, res) => {
    const filePath = path.join(__dirname, '../uploads', req.params.filename);
    
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ message: 'No such file exists' });
        }
        
        res.sendFile(filePath);
    });
});

module.exports = router;
