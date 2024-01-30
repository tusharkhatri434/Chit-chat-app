const express = require('express');
const dotenv = require('dotenv');
var cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
dotenv.config();
const routerProvider = require('./rotutes/routes');
const  connect = require('./data/connection');

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/',routerProvider); // Api routes
const PORT = process.env.PORT || 5000;

app.listen(PORT,async()=>{
    await connect();
    console.log(`Server started on port ${PORT}`);
})
