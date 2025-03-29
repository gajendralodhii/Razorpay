const express = require('express');
const app = express();
const indexRoutes = require('./routes/index.routes');

/* modulize */

/* 

routes => /routes/index.routes.js
db => db/db.js
razorpay => config/razorpay.js

 */

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRoutes)


module.exports = app;