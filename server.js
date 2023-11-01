require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();



const port = 8080; // default port for local dev

// Middleware
app.use(cors());
app.use(express.json());  // For parsing JSON requests

//use this to serve up front end 
app.use(express.static('frontend'));


// Routes
app.use('/', require('./routes/nameRoute'));
/*app.use('/', require('./routes/userContacts'));  // You can add this if you've created contactRoutes*/

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database!');

        // Only start the Express server after connecting to the database
        app.listen(process.env.PORT || port, () => {
            console.log('Web server listening on port ' + (process.env.PORT || port));
        });
    })
    .catch(err => {
        console.log('Error connecting to database', err);
    });
