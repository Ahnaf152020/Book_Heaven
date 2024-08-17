const express = require('express');
const { signUp, signIn, refreshToken } = require('../Controllers/authController'); // Check this path
const { updatePassword, getUserInfo } = require('../Controllers/userController'); // Check this path
const { verifyAccessToken } = require('../middleware/authMiddleware'); // Check this path
const roleMiddleware = require('../middleware/roleMiddleware'); // Check this path

// Import book controller functions
const { addBook, editBook, deleteBook } = require('../Controllers/bookController'); // Ensure this path is correct

const router = express.Router();

// Public routes
router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.post('/refresh-token', refreshToken);

// Protected routes
router.get('/users/:id', verifyAccessToken, getUserInfo); // Get user information by ID route
router.put('/update-password', verifyAccessToken, updatePassword); // Update password route

// Admin routes
router.post('/add', verifyAccessToken, roleMiddleware('admin'), addBook); // Add book route
router.put('/edit/:id', verifyAccessToken, roleMiddleware('admin'), editBook); // Edit book route
router.delete('/delete/:id', verifyAccessToken, roleMiddleware('admin'), deleteBook); // Delete book route

module.exports = router;
