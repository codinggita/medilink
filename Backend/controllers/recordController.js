const MedicalRecord = require('../models/MedicalRecord');

// @desc    Create new medical record
// @route   POST /api/records
// @access  Private (Doctor Only)
const createMedicalRecord = async (req, res) => {
    try {
        const { patientId, doctorId, diagnosis, prescription, notes } = req.body;

        const record = await MedicalRecord.create({
            patientId,
            doctorId: req.user?.id || doctorId,
            diagnosis,
            prescription,
            notes
        });

        res.status(201).json({ success: true, data: record });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all medical records (paginated + searchable)
// @route   GET /api/records?page=1&limit=10&search=...
// @access  Private (Doctor Only)
const getMedicalRecords = async (req, res) => {
    try {
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 10));
        const skip = (page - 1) * limit;

        const search = (req.query.search || '').toString().trim();
        const query = {};

        if (search) {
            query.$or = [
                { diagnosis: { $regex: search, $options: 'i' } },
                { prescription: { $regex: search, $options: 'i' } },
                { notes: { $regex: search, $options: 'i' } }
            ];
        }

        const [items, total] = await Promise.all([
            MedicalRecord.find(query).sort({ recordDate: -1, _id: -1 }).skip(skip).limit(limit),
            MedicalRecord.countDocuments(query)
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

// @desc    Get medical record by id
// @route   GET /api/records/:id
// @access  Private (Doctor Only)
const getMedicalRecordById = async (req, res) => {
    try {
        const record = await MedicalRecord.findById(req.params.id);
        if (!record) {
            return res.status(404).json({ success: false, message: 'Medical record not found' });
        }
        res.status(200).json({ success: true, data: record });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get patient's medical history
// @route   GET /api/records/patient/:patientId
// @access  Private
const getPatientRecords = async (req, res) => {
    try {
        const records = await MedicalRecord.find({ patientId: req.params.patientId })
            .populate('doctorId', 'userId specialization')
            .populate({
                path: 'doctorId',
                populate: { path: 'userId', select: 'name' }
            });

        res.status(200).json({ success: true, count: records.length, data: records });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update medical record (partial)
// @route   PATCH /api/records/:id
// @access  Private (Doctor Only)
const updateMedicalRecord = async (req, res) => {
    try {
        const updated = await MedicalRecord.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updated) {
            return res.status(404).json({ success: false, message: 'Medical record not found' });
        }

        res.status(200).json({ success: true, data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete medical record
// @route   DELETE /api/records/:id
// @access  Private (Doctor Only)
const deleteMedicalRecord = async (req, res) => {
    try {
        const deleted = await MedicalRecord.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Medical record not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createMedicalRecord,
    getPatientRecords,
    getMedicalRecords,
    getMedicalRecordById,
    updateMedicalRecord,
    deleteMedicalRecord
};
