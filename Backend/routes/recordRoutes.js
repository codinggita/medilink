const express = require('express');
const router = express.Router();
const {
    createMedicalRecord,
    getPatientRecords
} = require('../controllers/recordController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.post('/', protect, authorize('doctor'), createMedicalRecord);
router.get('/patient/:patientId', protect, getPatientRecords);

module.exports = router;
