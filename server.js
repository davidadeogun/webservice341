


const express = require('express');
const mongodb = require('./data/database');
const { professionalData } = require('./controllers/users');
const app = express();



const port = process.env.PORT || 8080; // default port for local dev

app.use('/', require('./routes'));

app.use(express.static('frontend'));
app.use(express.json());
// NEW UPDATE
app.use(professionalData);


mongodb.initDb((err) => {
    if(err) {
        console.log('Error connecting to database', err);
    } else {
        app.listen(process.env.PORT || port, () => {
            console.log('Database is listening and Node running on port ' + (process.env.PORT || port));
        });
    }
}); 


