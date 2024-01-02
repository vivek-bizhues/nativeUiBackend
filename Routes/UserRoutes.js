const express = require('express');
const router = express.Router();
const User = require('../Models/User.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const secretKey = 'yourSecretKey';

// Registration route
router.post('/register', async (req, res) => {
  const { mobile, email, password } = req.body;

  // Check if the email is already in use
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: 'Email is already in use' });
  }

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ mobile, email, password: hashedPassword});

  // Save the user to the database
  await user.save();

  res.json({ message: 'User registered successfully' });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // console.log(email,password)

  // Find the user by username
  const user = await User.findOne({ email});
  // console.log(user);

  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Compare the provided password with the stored hash
  const passwordMatch = await bcrypt.compare(password, user.password);
  // console.log(passwordMatch)

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Generate a JWT token and send it in the response
  const token = jwt.sign({ email }, secretKey);

  res.json({ message: 'Authentication successful', token, user });
});




module.exports = router;