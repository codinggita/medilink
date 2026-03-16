const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany();
    await Doctor.deleteMany();
    await Patient.deleteMany();

    // Create Demo Doctor
    const doctorUser = await User.create({
      name: 'Dr. John Smith',
      email: 'doctor@medilink.com',
      password: 'password123',
      role: 'doctor',
      phoneNumber: '1234567890'
    });

    await Doctor.create({
      userId: doctorUser._id,
      specialization: 'Cardiologist',
      experienceYears: 10,
      hospitalOrClinic: 'City Heart Center',
      licenseNumber: 'DOC12345',
      education: 'MD Cardiology'
    });

    // Create Demo Patient
    const patientUser = await User.create({
      name: 'Jane Doe',
      email: 'patient@medilink.com',
      password: 'password123',
      role: 'patient',
      phoneNumber: '0987654321'
    });

    await Patient.create({
      userId: patientUser._id,
      age: 28,
      gender: 'Female',
      bloodGroup: 'O+'
    });

    console.log('Demo data seeded successfully!');
    console.log('Doctor Creds: doctor@medilink.com / password123');
    console.log('Patient Creds: patient@medilink.com / password123');
    
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
