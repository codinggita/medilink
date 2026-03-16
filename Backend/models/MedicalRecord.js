const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Doctor',
        required: true
    },
    diagnosis: {
        type: String,
        required: [true, 'Please add a diagnosis']
    },
    prescription: {
        type: String,
        required: [true, 'Please add a prescription']
    },
    notes: {
        type: String
    },
    recordDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
