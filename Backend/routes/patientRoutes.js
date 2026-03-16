const express = require('express');
const router = express.Router();
const {
    getPatient,
    updatePatientProfile
} = require('../controllers/patientController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/:id', protect, getPatient);
router.put('/profile', protect, authorize('patient'), updatePatientProfile);

module.exports = router;
