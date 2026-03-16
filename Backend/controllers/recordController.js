const MedicalRecord = require('../models/MedicalRecord');

// @desc    Create new medical record
// @route   POST /api/records
// @access  Private (Doctor Only)
const createMedicalRecord = async (req, res) => {
    try {
        const { patientId, diagnosis, prescription, notes } = req.body;

        const record = await MedicalRecord.create({
            patientId,
            doctorId: req.user.id, // Assuming doctor is logged in
            diagnosis,
            prescription,
            notes
        });

        res.status(201).json({ success: true, data: record });
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

module.exports = {
    createMedicalRecord,
    getPatientRecords
};
