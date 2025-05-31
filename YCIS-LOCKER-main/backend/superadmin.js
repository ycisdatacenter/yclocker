const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');
const connectDB = require('./config/db');

dotenv.config();

const seedSuperAdmin = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Check if super admin already exists
    const existingAdmin = await User.findOne({ email: 'saurabh@ycis.com' });
    if (existingAdmin) {
      console.log('Super admin already exists:', existingAdmin.email);
      process.exit(0);
    }

    // Create super admin
    const superAdmin = new User({
      name: 'Saurabh',
      phone: '1234567890',
      email: 'saurabh@ycis.com',
      studentId: 'ADMIN001',
      phone: "1234567890",
      password: 'Saurabh@123',
      role: 'admin'
    });

    await superAdmin.save();
    console.log('Super admin seeded successfully:', superAdmin.email);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding super admin:', error.message);
    process.exit(1);
  }
};

seedSuperAdmin();