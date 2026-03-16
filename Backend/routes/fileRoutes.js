const express = require('express');
const router = express.Router();
const { uploadFile, getFiles, deleteFile } = require('../controllers/fileController');
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getFiles);
router.post('/upload', protect, upload.single('file'), uploadFile);
router.delete('/:id', protect, deleteFile);

module.exports = router;
