var express = require('express');
var mongoose = require('mongoose');

var recipeController = require('./controllers/recipe');

var port = process.env.PORT || 8000;

var app = express();

mongoose.connect('120.27.95.40:27017');

app.listen(port);