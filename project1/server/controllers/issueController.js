const Issue = require('../models/Issue');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Create new issue
const createIssue = async (req, res) => {
  try {
    const { title, description, category, location } = req.body;
    const image = req.file ? req.file.filename : null;

    const issue = new Issue({
      title,
      description,
      category,
      location,
      image,
      user: req.session.userId
    });

    await issue.save();
    await issue.populate('user', 'name email');

    res.status(201).json({
      message: 'Issue created successfully',
      issue
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user's issues
const getUserIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ user: req.session.userId })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json({ issues });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all issues (admin only)
const getAllIssues = async (req, res) => {
  try {
    const { category, status } = req.query;
    let filter = {};

    if (category && category !== 'All') filter.category = category;
    if (status && status !== 'All') filter.status = status;

    const issues = await Issue.find(filter)
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json({ issues });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update issue status (admin only)
const updateIssueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminComment } = req.body;

    const issue = await Issue.findByIdAndUpdate(
      id,
      { status, adminComment },
      { new: true }
    ).populate('user', 'name email');

    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    res.json({
      message: 'Issue updated successfully',
      issue
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createIssue,
  getUserIssues,
  getAllIssues,
  updateIssueStatus,
  upload
};