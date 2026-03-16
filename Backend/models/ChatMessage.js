const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    receiverId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    messageText: {
        type: String,
        required: true
    },
    mediaUrl: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    messageType: {
        type: String,
        enum: ['text', 'image', 'file'],
        default: 'text'
    }
});

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
