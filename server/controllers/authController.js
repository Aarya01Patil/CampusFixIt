const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    // Validate that all fields are present
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please ensure all fields are filled out' });
    }

    // Check if user exists in the database to prevent duplicates
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'A user with this email already exists' });
    }

    // Hash the password for security using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user entry
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || 'student'
    });

    if (user) {
        // Return user info and the JWT token
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user.id, user.role),
        });
    } else {
        res.status(400).json({ message: 'Could not create user with provided data' });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Look for the user by their email
    const user = await User.findOne({ email });

    // Verify the password matches the hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user.id, user.role),
        });
    } else {
        res.status(400).json({ message: 'Invalid email or password combination' });
    }
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    res.status(200).json(req.user);
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
};
