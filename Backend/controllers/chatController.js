const ChatMessage = require('../models/ChatMessage');

// @desc    Send message
// @route   POST /api/chat/send
// @access  Private
const sendMessage = async (req, res) => {
    try {
        const { receiverId, messageText, mediaUrl, messageType } = req.body;

        const message = await ChatMessage.create({
            senderId: req.user.id,
            receiverId,
            messageText,
            mediaUrl,
            messageType
        });

        res.status(201).json({ success: true, data: message });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get conversation messages
// @route   GET /api/chat/:conversationId
// @access  Private
const getMessages = async (req, res) => {
    try {
        const { receiverId } = req.query; // Assuming receiverId is passed to filter conversation
        
        const messages = await ChatMessage.find({
            $or: [
                { senderId: req.user.id, receiverId: receiverId },
                { senderId: receiverId, receiverId: req.user.id }
            ]
        }).sort({ timestamp: 1 });

        res.status(200).json({ success: true, count: messages.length, data: messages });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    sendMessage,
    getMessages
};
