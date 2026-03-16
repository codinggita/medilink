const Doctor = require('../models/Doctor');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Private
const getDoctors = async (req, res) => {
    try {
        const { specialization } = req.query;
        let query = {};
        
        if (specialization) {
            query.specialization = specialization;
        }

        const doctors = await Doctor.find(query).populate('userId', 'name email phoneNumber');
        res.status(200).json({ success: true, count: doctors.length, data: doctors });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single doctor
// @route   GET /api/doctors/:id
// @access  Private
const getDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id).populate('userId', 'name email phoneNumber');
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }
        res.status(200).json({ success: true, data: doctor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update doctor profile
// @route   PUT /api/doctors/profile
// @access  Private (Doctor Only)
const updateDoctorProfile = async (req, res) => {
    try {
        let doctor = await Doctor.findOne({ userId: req.user.id });
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor profile not found' });
        }

        doctor = await Doctor.findOneAndUpdate({ userId: req.user.id }, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: doctor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getDoctors,
    getDoctor,
    updateDoctorProfile
};
