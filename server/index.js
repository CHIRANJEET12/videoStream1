const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const routerapp = require("./routes/video");
const conn = require("./models/cons"); // Ensure this is properly set up

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize GridFS
conn.once('open', () => {
    console.log('MongoDB connection established');
});

// Routes
app.use("/video", routerapp);

// Error handling for MongoDB connection errors
conn.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/`);
});
