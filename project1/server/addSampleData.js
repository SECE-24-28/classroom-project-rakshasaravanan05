const mongoose = require('mongoose');
const User = require('./models/User');
const Issue = require('./models/Issue');
require('dotenv').config();

const sampleIssues = [
  {
    title: 'Broken WiFi in Library',
    description: 'WiFi connection is very slow and keeps disconnecting in the main library building.',
    category: 'WiFi',
    location: 'Main Library - 2nd Floor',
    status: 'Resolved',
    adminComment: 'WiFi router has been replaced and connection is now stable.'
  },
  {
    title: 'Power Outage in Classroom Block A',
    description: 'Frequent power cuts in Block A affecting classes and lab sessions.',
    category: 'Power',
    location: 'Academic Block A',
    status: 'In Progress',
    adminComment: 'Electrician team is working on the issue. Expected completion by tomorrow.'
  },
  {
    title: 'Water Leakage in Hostel Bathroom',
    description: 'Ceiling is leaking water in the common bathroom area causing flooding.',
    category: 'Water',
    location: 'Boys Hostel - Block 3, Floor 2',
    status: 'Pending',
    adminComment: ''
  },
  {
    title: 'Broken Projector in Auditorium',
    description: 'Main projector is not working properly, display is very dim and unclear.',
    category: 'Infrastructure',
    location: 'Main Auditorium',
    status: 'Resolved',
    adminComment: 'New projector installed and tested successfully.'
  },
  {
    title: 'Dirty Cafeteria Tables',
    description: 'Tables in the cafeteria are not being cleaned properly after meals.',
    category: 'Cleanliness',
    location: 'Student Cafeteria',
    status: 'In Progress',
    adminComment: 'Additional cleaning staff assigned. Monitoring the situation.'
  },
  {
    title: 'Broken Door Lock in Computer Lab',
    description: 'The main door lock is broken, security concern for expensive equipment.',
    category: 'Infrastructure',
    location: 'Computer Lab - Block B',
    status: 'Resolved',
    adminComment: 'New electronic lock system installed with access cards.'
  }
];

const addSampleData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Find or create a student user
    let student = await User.findOne({ email: 'student@campus.edu' });
    if (!student) {
      student = new User({
        name: 'John Student',
        email: 'student@campus.edu',
        password: 'student123',
        role: 'student'
      });
      await student.save();
      console.log('Sample student user created: student@campus.edu / student123');
    }

    // Clear existing issues
    await Issue.deleteMany({});
    console.log('Cleared existing issues');

    // Add sample issues
    for (const issueData of sampleIssues) {
      const issue = new Issue({
        ...issueData,
        user: student._id
      });
      await issue.save();
    }

    console.log(`Added ${sampleIssues.length} sample issues`);
    console.log('Sample data summary:');
    console.log('- 3 Resolved (Completed) issues');
    console.log('- 2 In Progress issues');
    console.log('- 1 Pending issue');
    
    process.exit(0);
  } catch (error) {
    console.error('Error adding sample data:', error);
    process.exit(1);
  }
};

addSampleData();