const express = require('express');
const db = require('./config/mongoose');
const port = process.env.PORT || 8000;
const app = express();
// const dotenv = require('dotenv').config();

// middle for parse form data
app.use(express.urlencoded({ extended: true }));

// Calling the express.json() method for parsing
app.use(express.json());

// use express router
app.use('/', require('./routes'));


// Listening to the port
app.listen(port, (err) => {

    if (err) {
        console.log(`Error while Running the Express Server: ${err}`);
        return;
    }

    console.log(`Express Server is running on port: ${port}`);

});
