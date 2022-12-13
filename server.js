const express = require('express');
const path = require('path');
const apiRoute = require('./routes/apiRoute');
const homeRoute = require('./routes/homeRoute');
const app = express();
const PORT = process.env.PORT || 8000;



//Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

app.use('/api', apiRoute);
app.use('/', homeRoute);

app.listen(PORT,()=> console.log(`Now listening on http:localhost:${PORT}`));