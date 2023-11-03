const express = require('express');
const mongodb = require('./data/database');
const {professionalData} = require('./controllers/users');
const app = express();
const cors = require('cors')

const port = process.env.PORT || 8080; // default port for local dev

app.use(cors());
app.use('/', require('./routes'));
app.use(express.static('frontend'));
app.use(express.json());
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


