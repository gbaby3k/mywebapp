const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

// Your User model (make sure it matches your schema)
const UserModel = require('../models/User');

router.post('/register', async (req, res) => {
    // Extract user data from the request body
    const { username, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = new UserModel({
        username: username,
        email: email,
        password: hashedPassword,
    });

    try {
        // Save the user to the database
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (error) {
        res.json({ message: error.message });
    }
});

module.exports = router;

// Function to send a welcome email
function sendWelcomeEmail(email, username) {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your_email@gmail.com', // Your Gmail email address
            pass: 'your_email_password', // Your Gmail email password
        },
    });

    // Define the email content
    const mailOptions = {
        from: 'your_email@gmail.com',
        to: email,
        subject: 'Welcome to Your App',
        text: `Hello ${username},\n\nWelcome to Your App! We're excited to have you on board.`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Welcome Email sent: ' + info.response);
        }
    });
}

// Function to notify the admin
function sendAdminNotification(username, userEmail) {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'glangford8008@gmail.com', // Your Gmail email address
            pass: 'D0minant93!', // Your Gmail email password
        },
    });

    // Define the email content
    const mailOptions = {
        from: 'glangford8008@gmail.com',
        to: adminEmail, // Admin email address
        subject: 'New User Registration',
        text: `A new user has registered:\n\nUsername: ${username}\nEmail: ${userEmail}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Admin Notification Email sent: ' + info.response);
        }
    });
}

module.exports = router;

// ... (previous code)

router.post('/login', async (req, res) => {
    // Extract login credentials from the request body
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if the provided password matches the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // You can generate a token here using 'jsonwebtoken' and send it in the response
        // For simplicity, we'll just send a success message for now
        res.json({ message: 'Login successful' });
    } catch (error) {
        res.json({ message: error.message });
    }
});

  // ... (previous code)
