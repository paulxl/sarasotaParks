const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // add middleware for cors
const connectDB = require("./db");

const router = express.Router();
const getParks = require('./');
const { init } = require("./schema");

// load env (environment) vars
dotenv.config({
    path: './config.env'
});

// Connect to datebase
connectDB();
// connectDB.serverConfig.isConnected();

const app = express(); // initialize express

// Body parser
app.use(express.json());

// Enable cors
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/parks', require('./routes.js'));

// router.route('/').get(getParks);
// app.use.router();


const PORT = process.env.PORT || 5500;

app.listen(PORT, () => console.log(`server running on flamingo juice ${process.env.NODE_ENV} on port ${PORT}`));

// module.exports = router;