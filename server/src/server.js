require("dotenv").config({path: __dirname + '/../.env'});
const express=require("express");
const mongoose=require("mongoose");
const config=require("config");
const App = express();
const home = require('./home');
const confess = require('./confess');
const cors = require('cors');

require('./errorHandler')();

console.log(process.env.NODE_ENV)

mongoose.connect(config.get('DBPORT'))
.then(() => console.log(`Connected to ${config.get('DBPORT')}`))
.catch((e) => console.log(`Cant connect to ${config.get('DBPORT')}`));


App.use(express.json());
App.use(cors());
App.use('/api/',home);
App.use('/api/confess', confess);


App.listen(config.get('PORT') || 3000, () => console.log(`Connected to Port ${config.get('PORT') || 3000}`));
















