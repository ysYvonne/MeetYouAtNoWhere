var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var qt = require('quickthumb');
var path = require('path');

var recipeController = require('./controller/recipe');
var userController = require('./controller/user');
var authController = require('./controller/auth');

var adminGroup = function () {
    return function (req, res, next) {
        if (req.user.admin == true)
            next();
        else
            res.status(401).json('Unauthorized');
    };
};

var port = process.env.PORT || 8000;

var app = express();
// app.use(qt.static(__dirname + '/'));
mongoose.connect('120.27.95.40:27017');

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));

app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'web')));

var router = express.Router();


router.route('/login')
    .post(authController.isAuthenticated,userController.login);

router.route('/users')
    .post(userController.postUsers)
    .get(userController.getUsers);

router.route('/users/:user_id')
    .get(userController.getUser)
    .put(authController.isAuthenticated, userController.putUser)
    .delete(authController.isAuthenticated, adminGroup(), userController.deleteUser);


app.use('/api', router);

app.listen(port);

