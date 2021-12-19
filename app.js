const express = require('express');
require('dotenv').config();

const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const YAML = require('yamljs');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = YAML.load("./swagger.yaml");

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(fileUpload());
app.use(morgan('combined'))

// import all routes here
const home = require('./routes/home');
const user = require('./routes/user');

// router middleware
app.use('/api/v1', home);
app.use('/api/v1', user);

module.exports = app;