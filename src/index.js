const express = require('express');
const router = require('./routes/indexRoutes');
require('dotenv').config({ path: '../env/development.env' })
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('../config/db');
const port = process.env.PORT || 3000;


app.use(cors({
  // origin:"http://127.0.0.1:5500",     it allows only this url
  // methods:['GET','POST','PUT'],       it allows these types of request
  // credentials: true,                   for cookies because bydefault cookies are blocked
}));
app.use('/', router);


app.listen(port, () => {
  console.log(`listening at port number ${port}`);
});