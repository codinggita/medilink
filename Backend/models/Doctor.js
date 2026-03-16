const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    specialization: {
        type: String,
        required: [true, 'Please add a specialization']
    },
    experienceYears: {
        type: Number,
        required: [true, 'Please add years of experience']
    },
    hospitalOrClinic: {
        type: String,
        required: [true, 'Please add hospital or clinic name']
    },
    licenseNumber: {
        type: String,
        required: [true, 'Please add license number']
    },
    education: {
        type: String,
        required: [true, 'Please add education details']
    },
    achievements: {
        type: String
    },
    verificationStatus: {
        type: String,
        enum: ['pending', 'verified', 'rejected'],
        default: 'pending'
    },
    profilePhoto: {
        type: String,
        default: 'no-photo.jpg'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Doctor', doctorSchema);
