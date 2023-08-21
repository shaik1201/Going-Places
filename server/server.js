const express = require('express');
var cors = require('cors');
const jwt = require('jsonwebtoken');
var md5 = require('md5');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json()); // Parse JSON data
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect('mongodb+srv://shaikiko12:pRIwSjXpU0xRlTT9@cluster0.jg8ckvw.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// mongoose.set("useCreateIndex", true);


const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true, required: true },
    password: String,
});

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email', // Specify the field to use for authentication
});


const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    image: String // Add this line to store the image file path
});


const User = mongoose.model('User', userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const Post = mongoose.model('Post', postSchema);

app.get('/api', (req, res) => {
    res.send("Listening...")
})

app.post('/api/register', async (req, res, next) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Create a new user instance
        const newUser = new User({
            first_name,
            last_name,
            email,
            password // Password will be hashed using Passport-local-mongoose
        });

        // Register the user using Passport-local-mongoose
        User.register(newUser, password, (err, user) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'An error occurred during registration' });
            }

            // Authenticate the user
            passport.authenticate('local')(req, res, () => {
                // Successful registration and authentication
                res.json({ first_name: user.first_name });
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        // console.log(req.body);
        const { email, password } = req.body;
        hashedPassword = md5(password);

        // Find user by email
        const user = await User.findOne({ email });
        console.log(`"password is: " ${user.password}`);

        if (!user) {
            console.log("user doesn't exist");
            return res.status(401).json({ message: 'User not found' });
        }

        // Compare passwords
        if (hashedPassword !== user.password) {
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



const multer = require("multer");

const upload = multer({ dest: "uploads/" }); // Set the destination folder for uploads

app.post('/api/posts', upload.single("image"), async (req, res) => {
    try {
        const { title, content } = req.body;
        const imagePath = req.file ? req.file.path : null; // Get the path of the uploaded image

        const newPost = new Post({
            title,
            content,
            image: imagePath // Associate the image path with the post
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
