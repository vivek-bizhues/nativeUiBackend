// routes/imageRoutes.js
const express = require('express');
const multer = require('multer');
const Image = require('../Models/Image.model');

const router = express.Router();

// Multer configuration for handling image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Image upload route
router.post('/upload', upload.single('file'), async (req, res) => {
    console.log(req.file)
  try {
    const userId = req.headers['user-id'];

    const image = new Image({
        uploadedBy: userId,
        filename: req.file.originalname
      });

    await image.save();

    res.status(201).send({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

module.exports = router;
