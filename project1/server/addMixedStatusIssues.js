const mongoose = require('mongoose');
const User = require('./models/User');
const Issue = require('./models/Issue');
require('dotenv').config();

const addMixedStatusIssues = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Find student user
    let student = await User.findOne({ email: 'student@campus.edu' });
    if (!student) {
      student = new User({
        name: 'John Student',
        email: 'student@campus.edu',
        password: 'student123',
        role: 'student'
      });
      await student.save();
    }

    // Clear existing issues
    await Issue.deleteMany({});

    // Create issues with different statuses
    const issues = [
      {
        title: 'WiFi Not Working in Library',
        description: 'Internet connection is very slow',
        category: 'WiFi',
        location: 'Main Library',
        status: 'In Progress',
        adminComment: 'IT team is working on this issue',
        user: student._id
      },
      {
        title: 'Power Outage in Block A',
        description: 'Electricity keeps going off',
        category: 'Power',
        location: 'Academic Block A',
        status: 'Resolved',
        adminComment: 'Fixed the main circuit breaker',
        user: student._id
      },
      {
        title: 'Water Leakage in Hostel',
        description: 'Ceiling is leaking water',
        category: 'Water',
        location: 'Boys Hostel Block 3',
        status: 'Pending',
        adminComment: '',
        user: student._id
      },
      {
        title: 'Broken Projector',
        description: 'Projector screen is not clear',
        category: 'Infrastructure',
        location: 'Classroom 101',
        status: 'In Progress',
        adminComment: 'Replacement projector ordered',
        user: student._id
      }
    ];

    for (const issueData of issues) {
      const issue = new Issue(issueData);
      await issue.save();
    }

    console.log('✅ Added 4 issues with mixed statuses:');
    console.log('- 1 Pending');
    console.log('- 2 In Progress');
    console.log('- 1 Resolved');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

addMixedStatusIssues();