const express = require('express');
const bodyParser = require('body-parser'); //Week 2
const mongodb = require('./data/database');
//const {professionalData} = require('./controllers/contacts');
const app = express();
const cors = require('cors')

const port = process.env.PORT || 8080; // default port for local dev


app.use(bodyParser.json()); //Week 2 
app.use((req, res, next) => {       //week2 newly added
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader(
         'Access-Control-Allow-Headers',
         'Origin, X-Requested-With, Content-Type, Accept, ZKey'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

app.use(cors());
app.use('/', require('./routes'));
app.use(express.static('frontend'));
app.use(express.json());
//app.use(professionalData);


mongodb.initDb((err) => {
    if(err) {
        console.log('Error connecting to database', err);
    } else {
        app.listen(process.env.PORT || port, () => {
            console.log('Database is connected and Server running on port ' + (process.env.PORT || port));
        });
    }
}); 


