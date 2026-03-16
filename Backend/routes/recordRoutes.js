const express = require('express');
const router = express.Router();
const {
    createMedicalRecord,
    getPatientRecords,
    getMedicalRecords,
    getMedicalRecordById,
    updateMedicalRecord,
    deleteMedicalRecord
} = require('../controllers/recordController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// CRUD (Feature 9)
router.get('/', protect, authorize('doctor'), getMedicalRecords);
router.get('/:id', protect, authorize('doctor'), getMedicalRecordById);
router.post('/', protect, authorize('doctor'), createMedicalRecord);
router.patch('/:id', protect, authorize('doctor'), updateMedicalRecord);
router.delete('/:id', protect, authorize('doctor'), deleteMedicalRecord);

// Patient record history
router.get('/patient/:patientId', protect, getPatientRecords);

module.exports = router;
