var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var qt = require('quickthumb');
var path = require('path');

var recipeController = require('./controllers/recipe');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');

var port = process.env.PORT || 8000;

var app = express();

mongoose.connect('120.27.95.40:27017');

app.use(qt.static(__dirname + '/'));
mongoose.connect('127.0.0.1:27017');

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));

app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'app')));

var router = express.Router();


router.route('/login')
    .post(authController.isAuthenticated, userController.login);

router.route('/users')
    .post(userController.postUsers)
    .get(userController.getUsers);

router.route('/users/:user_id')
    .get(userController.getUser)
    .put(authController.isAuthenticated, userController.putUser)
    .delete(authController.isAuthenticated, adminGroup(), userController.deleteUser);


app.use('/api', router);

app.listen(port);

