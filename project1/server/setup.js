const mongoose = require('mongoose');
const User = require('./models/User');
const Issue = require('./models/Issue');
require('dotenv').config();

const setupProject = async () => {
  try {
    console.log('🔧 Setting up Campus Issue Reporting System...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/campus-issues');
    console.log('✅ Connected to MongoDB');

    // Create admin user
    let admin = await User.findOne({ email: 'admin@campus.edu' });
    if (!admin) {
      admin = new User({
        name: 'Admin User',
        email: 'admin@campus.edu',
        password: 'admin123',
        role: 'admin'
      });
      await admin.save();
      console.log('✅ Admin user created');
    }

    // Create student user
    let student = await User.findOne({ email: 'student@campus.edu' });
    if (!student) {
      student = new User({
        name: 'John Student',
        email: 'student@campus.edu',
        password: 'student123',
        role: 'student'
      });
      await student.save();
      console.log('✅ Student user created');
    }

    // Clear and create sample issues
    await Issue.deleteMany({});
    
    const sampleIssues = [
      {
        title: 'WiFi Not Working',
        description: 'Internet connection is very slow in the library',
        category: 'WiFi',
        location: 'Main Library',
        status: 'In Progress',
        adminComment: 'IT team is working on this',
        user: student._id
      },
      {
        title: 'Power Outage',
        description: 'Electricity keeps going off in Block A',
        category: 'Power',
        location: 'Academic Block A',
        status: 'Resolved',
        adminComment: 'Fixed the circuit breaker',
        user: student._id
      },
      {
        title: 'Water Leakage',
        description: 'Ceiling is leaking in hostel bathroom',
        category: 'Water',
        location: 'Boys Hostel Block 3',
        status: 'Pending',
        user: student._id
      }
    ];

    for (const issueData of sampleIssues) {
      const issue = new Issue(issueData);
      await issue.save();
    }

    console.log('✅ Sample issues created');
    console.log('');
    console.log('🎉 Setup complete!');
    console.log('');
    console.log('👥 Test Accounts:');
    console.log('   Admin: admin@campus.edu / admin123');
    console.log('   Student: student@campus.edu / student123');
    console.log('');
    console.log('🚀 Now run: npm run dev');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
};

setupProject();