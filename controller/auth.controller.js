const Auth = require('../models/auth.model.js');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key'; // Replace with env variable in production
const bcrypt = require('bcrypt');

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        sukses: false,
        message: 'Invalid email format. Use name@mail.com format.' });
    }

    // Password length validation
    // if (password.length < 8) {
    //   return res.status(400).json({ 
    //     sukses: false,
    //     message: 'Password must be at least 8 characters long.' });
    // }

    // Make sure to include password in the query result
    const user = await Auth.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ 
        sukses: false,
        message: 'Invalid email or password' 
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ 
        sukses: false,
        message: 'Invalid email or password'
       });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '3d' });

    res.status(200).json({
      sukses: true,
      message: 'Login successful',
      
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        token: `${token}`,
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      sukses: false,
      message: 'Server error' });
  }
};


const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        sukses: false,
        message: 'Invalid email format. Use name@mail.com format.' });
    }

    // Password length validation
    if (password.length < 8) {
      return res.status(400).json({ 
        sukses: false,
        message: 'Password must be at least 8 characters long.' });
    }

    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ 
        sukses: false,
        message: 'User with the same email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds
    const user = await Auth.create({ name, email, password: hashedPassword });

    const userData = user.toObject();
    delete userData.password;

    res.status(201).json({
      sukses: true,
      message: 'User registered successfully',
      user:{
        user_id: user.user_id,
        name: user.name,
        email: user.email,
      }
      
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const getUserId = async (req, res) => {
  try {
    const { user_id, email } = req.body;

    if (!user_id || !email) {
      return res.status(400).json({
        sukses: false,
        message: 'User ID and email are required.'
      });
    }

    const user = await Auth.findOne({ _id: user_id, email });

    if (!user) {
      return res.status(404).json({
        sukses: false,
        message: 'User not found.'
      });
    }

    res.status(200).json({
      sukses: true,
      message: 'User retrieved successfully',
      user
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      sukses: false,
      message: 'Internal server error',
      error
    });
  }
};


module.exports = {
    userLogin,
    userRegister,
    getUserId
};