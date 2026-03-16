const express = require('express');
const router = express.Router();
const {
    createAppointment,
    getDoctorAppointments,
    getPatientAppointments,
    updateAppointmentStatus
} = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.post('/', protect, authorize('patient'), createAppointment);
router.get('/doctor/:doctorId', protect, authorize('doctor'), getDoctorAppointments);
router.get('/patient/:patientId', protect, authorize('patient'), getPatientAppointments);
router.put('/:id', protect, authorize('doctor'), updateAppointmentStatus);

module.exports = router;
