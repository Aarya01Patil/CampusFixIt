const Issue = require('../models/Issue');

// @desc    Create new issue
// @route   POST /api/issues
// @access  Private (Student)
const createIssue = async (req, res) => {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
        return res.status(400).json({ message: 'Please add all fields' });
    }

    let imageUrl = '';
    if (req.file) {
        imageUrl = req.file.path.replace('\\', '/'); // Fix windows path
    }

    try {
        const issue = await Issue.create({
            title,
            description,
            category,
            imageUrl,
            student: req.user.id,
            status: 'Open'
        });
        res.status(201).json(issue);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get issues
// @route   GET /api/issues
// @access  Private
const getIssues = async (req, res) => {
    try {
        let query = {};

        // If student, only get own issues
        if (req.user.role === 'student') {
            query.student = req.user.id;
        }

        // Filter provided in query string
        if (req.query.status) {
            query.status = req.query.status;
        }
        if (req.query.category) {
            query.category = req.query.category;
        }

        const issues = await Issue.find(query).populate('student', 'name email').sort({ createdAt: -1 });
        res.status(200).json(issues);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update issue (Admin)
// @route   PUT /api/issues/:id
// @access  Private (Admin)
const updateIssue = async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id);

        if (!issue) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        const { status, remarks } = req.body;

        issue.status = status || issue.status;
        issue.remarks = remarks || issue.remarks;

        const updatedIssue = await issue.save();
        res.status(200).json(updatedIssue);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createIssue,
    getIssues,
    updateIssue
};
