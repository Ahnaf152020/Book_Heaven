const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Generate access token
const generateAccessToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
};

// Generate refresh token
const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

// Sign up new user
exports.signUp = async (req, res) => {
  const { username, email, password, address } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, address });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

// Sign in existing user or admin
exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for admin credentials
    if (email === 'admin@example.com' && password === 'adminpassword') {
      const accessToken = generateAccessToken('admin', 'admin');
      const refreshToken = generateRefreshToken('admin');
      return res.json({
        accessToken,
        refreshToken,
        userId: 'admin',
        username: 'Admin',
        role: 'admin',
        email: 'admin@example.com',
        address: 'N/A',
        message: 'Admin login successful',
      });
    }

    // Check for regular user credentials
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password validity
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate tokens for regular user
    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);

    // Send response with tokens and user information
    res.json({
      accessToken,
      refreshToken,
      userId: user._id,
      username: user.username,
      role: user.role,
      email: user.email,
      address: user.address,
      message: 'Login successful',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// Refresh token
exports.refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh Token is required' });
  }
  
  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Refresh token is not valid' });
    }
    
    // Generate new access token
    const accessToken = generateAccessToken(decoded.userId, decoded.role); // Adjusted to use decoded role
    res.json({ accessToken });
  });
};
