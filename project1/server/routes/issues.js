const express = require('express');
const { createIssue, getUserIssues, getAllIssues, updateIssueStatus, upload } = require('../controllers/issueController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// POST /api/issues - Create new issue
router.post('/', requireAuth, upload.single('image'), createIssue);

// GET /api/issues/my - Get user's issues
router.get('/my', requireAuth, getUserIssues);

// GET /api/issues/all - Get all issues (admin only)
router.get('/all', requireAdmin, getAllIssues);

// PUT /api/issues/:id - Update issue status (admin only)
router.put('/:id', requireAdmin, updateIssueStatus);

module.exports = router;