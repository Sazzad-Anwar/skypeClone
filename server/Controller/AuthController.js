const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../Model/UserModel');
const bcrypt = require('bcryptjs');

const login = asyncHandler(async (req, res) => {
    const { email, password, socketId } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(401).json({
            success: false,
            error: 'Invalid credentials'
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        res.status(401).json({
            success: false,
            error: 'Invalid credentials'
        });
    }
    user.socketId = socketId;
    user.isActive = true;
    await user.save();

    const token = jwt.sign({ details: { _id: user._id } }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.status(200).json({ success: true, token });

});

const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400).json({
            success: false,
            error: 'Please provide all required fields'
        });
    } else {
        const user = await User.findOne({ email });

        if (user) {
            res.status(400).json({
                success: false,
                error: 'User already exists'
            });
        } else {
            const newUser = await User.create({ name, email, password });

            const token = jwt.sign({ details: { _id: newUser._id } }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

            res.status(200).json({ success: true, token });
        }
    }
});

const userDetails = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    res.status(200).json({ success: true, data: user });
})

const userDetailsUpdate = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json({ success: true, data: user });
});

module.exports = {
    login,
    register,
    userDetails,
    userDetailsUpdate
}