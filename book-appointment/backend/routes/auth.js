const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role, specialization } = req.body;
        // Basic validation
        if (!name || !email || !password || !role) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }

        const user = new User({ name, email, password, role, specialization }); // In real app, hash password
        await user.save();
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        // Return user info (excluding password ideally, but for now simple)
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            specialization: user.specialization
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
