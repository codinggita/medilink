const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
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
    fileType: {
        type: String,
        enum: ['MRI', 'CT_SCAN', 'XRAY', 'BLOOD_TEST', 'LAB_REPORT', 'IMAGE', 'VIDEO', 'DOCUMENT'],
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('File', fileSchema);
