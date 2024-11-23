const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const bibitRoute = require('./src/routes/bibitRoutes');
const pupukRoute = require('./src/routes/pupukRoute');
const authRoute = require('./src/routes/authRoute');
const { isAuth } = require('./src/middleware/authMiddleware');
const Pupuk = require('./src/models/pupukModel');

const port = process.env.PORT || 3000;

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method')); // Add method override middleware

// Session middleware
app.use(session({
    secret: 'your-secret-key', // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Routes
app.use('/', authRoute);
app.use('/bibit', bibitRoute);
app.use('/pupuk', pupukRoute);

app.get('/', isAuth, (req, res) => {
    res.render('index');
});

app.get('/pupuk', isAuth, async (req, res) => {
    try {
        const pupukData = await Pupuk.getPupuk();
        res.render('pupuk', { pupuk: pupukData });
    } catch (error) {
        res.status(500).send('Error fetching pupuk data');
    }
});

app.get('/bibit', isAuth, async (req, res) => {
    const bibitData = await require('./src/models/bibitModel').getBibit();
    res.render('bibit', { bibit: bibitData });
});

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});