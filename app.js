var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var qt = require('quickthumb');
var path = require('path');


var adminController = require('./controller/admin');
var authController = require('./controller/auth');
var followController = require('./controller/follow');
var labelController = require('./controller/label');
var likeController = require('./controller/like');
var ownController = require('./controller/own');
var recipeController = require('./controller/recipe');
var recipe_LabelController = require('./controller/recipe_Label');
var stepController = require('./controller/step');
var userController = require('./controller/user');
var user_LabelController = require('./controller/user_Label');

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

app.use(express.static(path.join(__dirname, 'Web')));

var router = express.Router();




router.route('/follow')
    .post(authController.isAuthenticated,followController.postFollows);

router.route('/getfollows')  
    .get(authController.isAuthenticated,followController.getFollows);

router.route('/deletefollow')
    .delete(authController.isAuthenticated,followController.deleteFollow);

router.route('/label')
    .post(labelController.postLabels);

router.route('/getlabels')
    .get(authController.isAuthenticated,labelController.getLabels);

router.route('/deletelabel')
    .delete(authController.isAuthenticated,labelController.deleteLabel );

router.route('/like')
    .post(authController.isAuthenticated, likeController.postLikes);

router.route('/getlikes')
    .get(authController.isAuthenticated,likeController.getLikes);

router.route('/deletelike')
    .delete(authController.isAuthenticated,likeController.deleteLike );

router.route('/own')
    .post(authController.isAuthenticated, ownController.postOwns);

router.route('/putown')
    .put(authController.isAuthenticated, adminGroup(), ownController.putown);

router.route('/getowns')
    .get(authController.isAuthenticated, ownController.getowns);

router.route('/deleteown')
    .delete(authController.isAuthenticated, ownController.deleteown);

router.route('/recipe')
    .post(authController.isAuthenticated, recipeController.postRecipes);

router.route('/getrecipe')
    .get(authController.isAuthenticated, recipeController.getRecipe);

router.route('/getrecipes')
    .get(authController.isAuthenticated, recipeController.getRecipes);

router.route('/putrecipe')
    .put(authController.isAuthenticated, recipeController.putRecipe);            

router.route('/deleterecipe')
    .delete(authController.isAuthenticated, recipeController.deleteRecipe);

router.route('/recipe_Label')
    .post(authController.isAuthenticated, recipe_LabelController.postRecipe_Labels);

router.route('/getrecipe_Labels')
    .get(authController.isAuthenticated, recipe_LabelController.getrecipe_Labels);

router.route('/deleterecipe_Labels')
    .delete(authController.isAuthenticated, recipe_LabelController.deleterecipe_Label);    

router.route('/step')
    .post(authController.isAuthenticated, stepController.postSteps);    

router.route('/getsteps')
    .get(authController.isAuthenticated, stepController.getSteps);  

router.route('/putsteps')
    .put(authController.isAuthenticated, stepController.putSteps);  

router.route('/deletesteps')
    .delete(authController.isAuthenticated, stepController.deleteStep);  

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
    .put(authController.isAuthenticated,,userController.putUserInfo);

router.route('/user_Labels')
    .post(authController.isAuthenticated, user_LabelController.postUser_Labels);

router.route('/getuser_Labels')
    .get(authController.isAuthenticated, user_LabelController.getuser_Labels);

router.route('/deleteuser_Label')
    .delete(authController.isAuthenticated, user_LabelController.deleteuser_Label);   

app.use('/api', router);

app.listen(port);

