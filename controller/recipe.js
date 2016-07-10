var Recipe = require('../models/recipe');
var Step = require('../models/step');
var Chance = require('chance');
var fs = require('fs-extra');

exports.postRecipes = function (req, res) {

    var recipe = new Recipe();
    recipe.name = req.body.name;
    recipe.description = req.body.description;
    recipe.calorie = req.body.calorie;
    recipe.meterials = req.body.meterials;
    recipe.steps = req.body.steps
    recipe.userId = req.user._id;
    //recipe.likeNum = req.body.likeNum;
    //recipe.favorateNum = req.body.favorateNum;

 /*
    var meterial_str = new String();

    meterial_str = req.body.meterials;

    var meterials = new Array(); //定义一数组 

    meterials=meterial_str.split(","); //字符分割 
    for (i=0;i<meterials.length ;i++ ) 
    { 
        var str = new Array();
        str = meterials[i].split("#");
        recipe.meterials[i].name = str[0];
        recipe.meterials[i].dosage = str[1];
    } 

*/



    if (!(req.body.picture === undefined)) {
        var my_chance = new Chance();
        var guid = my_chance.guid();
        recipe.photo = "uploads/" + guid + ".png";
        var base64Data = req.body.picture.replace(/^data:image\/png;base64,/, "");
        fs.writeFile('uploads/' + guid + '.png', base64Data, 'base64', function (err) {
            if (err)
                res.status(400).json(err);
            else {
                recipe.save(function (err) {
                    if (err)
                        res.status(400).json(err);
                    else
                        res.status(201).json(recipe);
                });
            }
        });
    }
    else {
        recipe.save(function (err) {
            if (err)
                res.status(400).json(err);
            else
                res.status(201).json(recipe);
        });
    }
};

exports.getRecipes = function (req, res) {
    Recipe.find({}, function (err, Recipes) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(Recipes);
    });
};

exports.getRecipe = function (req, res) {
    Recipe.find({_id: req.params.Recipe_id}, function (err, Recipe) {
        if (err)
            res.status(400).json(err);
        else if (!Recipe)
            res.status(404).end();
        else
            res.status(200).json(Recipe);
    });
};

exports.putRecipe = function (req, res) {
    if (!(req.body.picture === undefined)) {
        var my_chance = new Chance();
        var guid = my_chance.guid();
        var photo ="uploads/" + guid + ".png";
        var base64Data = req.body.picture.replace(/^data:image\/png;base64,/, "");
        fs.writeFile('uploads/' + guid + '.png', base64Data, 'base64', function (err) {
            if (err)
                res.status(400).json(err);
        });
    };
    Recipe.update({_id: req.params.Recipe_id}, {
        name : req.body.name,
        description : req.body.description,
        calorie : req.body.calorie,
        meterials: req.body.meterials,
        steps : req.body.steps,
        likeNum : req.body.likeNum,
        favorateNum : req.body.favorateNum,
        photo:photo
    },function (err, num, raw) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};

exports.deleteRecipe = function (req, res) {
    Recipe.remove({_id: req.params.Recipe_id}, function (err) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};
