const File = require('../models/File');

// @desc    Get medical files (paginated)
// @route   GET /api/files?patientId=...&page=1&limit=10
// @access  Private
const getFiles = async (req, res) => {
    try {
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 10));
        const skip = (page - 1) * limit;

        const patientId = req.query.patientId;
        if (!patientId) {
            return res.status(400).json({ success: false, message: 'patientId is required' });
        }

        const [items, total] = await Promise.all([
            File.find({ patientId }).sort({ uploadDate: -1, _id: -1 }).skip(skip).limit(limit),
            File.countDocuments({ patientId })
        ]);

        res.status(200).json({
            success: true,
            page,
            limit,
            total,
            totalPages: Math.max(1, Math.ceil(total / limit)),
            data: items
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

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

// @desc    Delete medical file
// @route   DELETE /api/files/:id
// @access  Private
const deleteFile = async (req, res) => {
    try {
        const deleted = await File.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'File not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getFiles,
    uploadFile,
    deleteFile
};
