var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var qt = require('quickthumb');
var path = require('path');
var multiparty = require('connect-multiparty');
var mulipartyMiddleware = multiparty();
var authController = require('./controller/auth');
var contactController = require('./controller/contact')
var followController = require('./controller/follow');
var likeController = require('./controller/like');
var recipeController = require('./controller/recipe');
var userController = require('./controller/user');

var adminGroup = function () {
    return function (req, res, next) {
        if (req.user.admin == true)
            next();
        else
            res.status(400).json('Unauthorized');
    };
};

var port = process.env.PORT || 8000;

var app = express();
// app.use(qt.static(__dirname + '/'));
mongoose.connect('120.27.95.40:27017');

app.use(bodyParser({uploadDir:'./uploads'}));

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));

app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'Web')));

app.use(express.static(path.join(__dirname, 'uploads')));

var router = express.Router();


router.route('/contact')
    .post(authController.isAuthenticated,contactController.postContacts);

router.route('/getcontacts')
    .get(authController.isAuthenticated,contactController.getContacts);

router.route('/deletecontact')
    .delete(authController.isAuthenticated,adminGroup(),contactController.deleteContact);

router.route('/follow')
    .post(authController.isAuthenticated,followController.postFollows);

router.route('/getfollows')  
    .get(authController.isAuthenticated,followController.getFollows);

router.route('/deletefollow')
    .delete(authController.isAuthenticated,followController.deleteFollow);

router.route('/like')
    .post(authController.isAuthenticated, likeController.postLikes);

router.route('/getlikes')
    .get(authController.isAuthenticated,likeController.getLikes);

router.route('/deletelike')
    .delete(authController.isAuthenticated,likeController.deleteLike );

router.route('/recipe')
    .post(authController.isAuthenticated,mulipartyMiddleware,recipeController.postRecipes);

router.route('/getownrecipe/:user_id')
    .get(authController.isAuthenticated, recipeController.getOwnRecipes);

router.route('/getrecipes')
    .get(authController.isAuthenticated, recipeController.getRecipes);

router.route('/putrecipestatus/:recipe_id')
    .put(authController.isAuthenticated,  adminGroup(), recipeController.putRecipeStatus);  

router.route('/putrecipe/:recipe_id')
    .put(authController.isAuthenticated, recipeController.putRecipe);            

router.route('/deleterecipe')
    .delete(authController.isAuthenticated, recipeController.deleteRecipe);

router.route('/login')
    .post(authController.isAuthenticated,userController.login);

router.route('/users')
    .post(userController.postUsers)
    .get(userController.getUsers);

router.route('/users/:user_id')
    .get(userController.getUser)
    .put(authController.isAuthenticated, userController.putUserPassword)
    .delete(authController.isAuthenticated, adminGroup(), userController.deleteUser);

router.route('/users/:user_id/profile')
    .put(authController.isAuthenticated,userController.putUserInfo);

router.route('/users/:user_id/photo')
    .put(authController.isAuthenticated,mulipartyMiddleware,userController.putUserPhoto);


app.use('/api', router);

app.listen(port);

