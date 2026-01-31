const mongoose = require('mongoose');
const Issue = require('./models/Issue');
require('dotenv').config();

const clearIssues = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Delete all issues
    await Issue.deleteMany({});
    console.log('All issues cleared from database');
    
    process.exit(0);
  } catch (error) {
    console.error('Error clearing issues:', error);
    process.exit(1);
  }
};

clearIssues();