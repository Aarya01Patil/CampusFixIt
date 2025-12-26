const express = require('express');
const router = express.Router();
const { createIssue, getIssues, updateIssue } = require('../controllers/issueController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
    .get(protect, getIssues)
    .post(protect, upload.single('image'), createIssue);

router.route('/:id')
    .put(protect, admin, updateIssue);

module.exports = router;
