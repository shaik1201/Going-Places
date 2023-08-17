const express = require('express');
var cors = require('cors');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json()); // Parse JSON data
app.use(cors());


mongoose.connect('mongodb://localhost:27017/travelAppDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
});

const postSchema = new mongoose.Schema({
    content: String
});

const User = mongoose.model('User', userSchema);

const Post = mongoose.model('Post', postSchema);

app.get('/api', (req, res) => {
    res.send("Listening...")
})

app.post('/api/register', async (req, res) => {
    console.log(req.body);
    try {
        const { first_name, last_name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }


        const newUser = new User({
            first_name,
            last_name,
            email,
            password,
        });
        newUser.save();
        res.json({ "first_name": first_name });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        console.log(`"password is: " ${user.password}`);

        if (!user) {
            console.log("user doesn't exist");
            return res.status(401).json({ message: 'User not found' });
        }

        // Compare passwords
        if (password !== user.password) {
            console.log("incorrect password");
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Generate and send token
        const token = jwt.sign({ userId: user._id }, 'your-secret-key');
        res.json({ "token": token, "name": user.first_name });
        console.log("user found");

    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});



app.post('/api/posts', async (req, res) => {
    try {
        const { content } = req.body;

        const newPost = new Post({
            content
        });

        await newPost.save();
        res.json({ message: 'Post submitted successfully' });

    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.get('/api/getPosts', async (req, res) => {
    try {
        // Query the database to get all posts
        const posts = await Post.find();

        // Send the posts as a JSON response
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});









app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
