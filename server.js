//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const alert = require('alert');
mongoose.connect('mongodb://localhost:27017/nimish', {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
var index = require('./routes/app');
app.use('/', index);

app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
