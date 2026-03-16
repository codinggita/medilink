const Patient = require('../models/Patient');

// @desc    Get patient profile
// @route   GET /api/patients/:id
// @access  Private
const getPatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id).populate('userId', 'name email phoneNumber');
        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }

        // Only allow doctor or the patient themselves to view the profile
        if (req.user.role === 'patient' && req.user._id.toString() !== patient.userId._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized to view this profile' });
        }

        res.status(200).json({ success: true, data: patient });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update patient profile
// @route   PUT /api/patients/profile
// @access  Private (Patient Only)
const updatePatientProfile = async (req, res) => {
    try {
        let patient = await Patient.findOne({ userId: req.user.id });
        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient profile not found' });
        }

        patient = await Patient.findOneAndUpdate({ userId: req.user.id }, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: patient });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getPatient,
    updatePatientProfile
};
