//express web server
const express = require('express');
const app = express();


//home page route of the application
app.get('/', (req, res) => {
    res.send('David!');

    
const port = 3000;
//start the web server
app.listen(process.env.port || port, () => {
    console.log('Web server listening on port ' + (process.env.port || port));
});