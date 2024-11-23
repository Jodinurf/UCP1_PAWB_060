const express = require('express');
const bcrypt = require('bcrypt');
const { connectDB } = require('../configs/database');
const router = express.Router();

// Sign up
router.post('/sign-up', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';

    try {
        const connection = await connectDB();
        await connection.execute(query, [username, hashedPassword]);
        await connection.end();
        res.status(201).send('User created');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ?';

    try {
        const connection = await connectDB();
        const [result] = await connection.execute(query, [username]);
        await connection.end();

        if (result.length === 0) {
            res.status(404).send('User not found');
            return;
        }

        const user = result[0];
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            res.status(401).send('Wrong password');
            return;
        }

        req.session.userId = user.id;
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Show login form
router.get('/login', (req, res) => {
    res.render('login');
});

// Logout
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Error logout");
        }
        res.redirect('/login');
    });
});

module.exports = router;