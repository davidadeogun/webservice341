const swaggerAutogen = require('swagger-autogen')();  //Week 2

const doc = {
    info: {
        title: "API Tests",
        description: "API for NodeJS"
    },
    host: "localhost:8080",
    schemes: ['http']
    };

const outputFile = './swagger.json';    
const endpointsFiles = ['./routes/index.js'];

//This will generate the swagger.json file
swaggerAutogen(outputFile, endpointsFiles, doc);
