const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const { generateToken } = require('../utils/tokenUtils');
const { validateRegistration } = require('../utils/validationUtils');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, phoneNumber } = req.body;

        // Validation
        const validation = validateRegistration(req.body);
        if (!validation.isValid) {
            return res.status(400).json({ success: false, errors: validation.errors });
        }

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role,
            phoneNumber
        });

        if (user) {
            // If role is doctor, create empty doctor profile
            if (role === 'doctor') {
                await Doctor.create({
                    userId: user._id,
                    specialization: 'Not Specified',
                    experienceYears: 0,
                    hospitalOrClinic: 'Not Specified',
                    licenseNumber: 'PENDING',
                    education: 'Not Specified'
                });
            } else if (role === 'patient') {
                // If role is patient, create empty patient profile
                await Patient.create({
                    userId: user._id,
                    age: 0,
                    gender: 'Other',
                    bloodGroup: 'Unknown'
                });
            }

            res.status(201).json({
                success: true,
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`Login attempt for: ${email}`);

        // Check for user email
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            console.log(`User not found: ${email}`);
            return res.status(401).json({ success: false, message: 'Invalid credentials - User not found' });
        }

        const isMatch = await user.matchPassword(password);
        console.log(`Password match for ${email}: ${isMatch}`);

        if (isMatch) {
            res.json({
                success: true,
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials - Password mismatch' });
        }
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getMe
};
