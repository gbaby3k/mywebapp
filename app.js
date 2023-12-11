// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

// Create Express app
const app = express();
const port = 3000;

// Middleware
app.use(cors({ origin: 'https://ntro.cc' }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://grant1:J5y2lOBZu2I6hIbl@cluster0.bd6e5l2.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a simple Mongoose model
const User = mongoose.model('User', {
    username: String,
    email: String,
    password: String,
});

// Registration route
app.post('/auth/register', async (req, res) => {
    try {
        // Extract user data from the request
        const { username, email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Respond with a success message
        res.status(201).json({ message: 'User created successfully.', user: savedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
