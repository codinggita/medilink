const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Doctor',
        required: true
    },
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Patient',
        required: true
    },
    appointmentDate: {
        type: Date,
        required: [true, 'Please add an appointment date']
    },
    appointmentTime: {
        type: String,
        required: [true, 'Please add an appointment time']
    },
    reason: {
        type: String,
        required: [true, 'Please add a reason for the appointment']
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
