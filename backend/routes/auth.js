// ------------- Importing Packages ------------
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');


// ----------------- JWT Secret -----------------
const JWT_SECRET = "mysecret";

// ------------ Importing User Model ------------
const User = require('../models/User');

//-------------- Route - Base Page --------------
// Creat a User using: POST "/api/auth/creatUser". Doesn't require Auth
router.get('/', (req, res) => {
    res.send('<a href="/api/auth/creatUser">Create User</a>')
})

//----------- Route - Creating a User -----------
// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Check whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
            success = false;
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ------------ Route - Login a User ------------
router.post('/login', [
    body('email', "Enter a valid email.").isEmail(),
    body('password', "Password cannot be blank.").exists(),
], async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the user with this email exists already
    // const { email, password } = req.body;
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: "Please enter a valid email." });
        }

        const passwordCompare = await bcrypt.compare(req.body.password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Please enter a valid password." });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({ success, authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Sever Error Occured.");
        // SQS, Logger
    }
})

// ------------ Route - Get LoggedIn User ------------
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ------------ Route - Exporting ------------
module.exports = router;