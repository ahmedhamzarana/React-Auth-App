const User = require('../models/users');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let errors = {};

    if (!name) errors.name = 'Name is required';
    if (!email) errors.email = 'Email is required';
    if (!password) errors.password = 'Password is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !emailRegex.test(email)) {
      errors.email = 'Invalid email format';
    }

    if (password && password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      errors.email = 'Email already exists';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = generateToken(user._id, user.email);

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};