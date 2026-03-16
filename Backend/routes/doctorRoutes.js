const express = require('express');
const router = express.Router();
const {
    getDoctors,
    getDoctor,
    updateDoctorProfile
} = require('../controllers/doctorController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/', protect, getDoctors);
router.get('/:id', protect, getDoctor);
router.put('/profile', protect, authorize('doctor'), updateDoctorProfile);

module.exports = router;
