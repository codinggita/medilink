const File = require('../models/File');

// @desc    Upload medical file
// @route   POST /api/files/upload
// @access  Private
const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload a file' });
        }

        const { patientId, doctorId, fileType } = req.body;

        const file = await File.create({
            patientId,
            doctorId,
            fileType,
            fileName: req.file.filename,
            fileUrl: `/uploads/${req.file.filename}`
        });

        res.status(201).json({ success: true, data: file });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    uploadFile
};
