var Recipe = require('../models/recipe');
var Chance = require('chance');
var fs = require('fs-extra');

exports.postRecipes = function (req, res) {

    var Recipe = new Recipe();
    Recipe.name = req.body.name;
    Recipe.description = req.body.description;
    Recipe.calorie = req.body.calorie;
    Recipe.meterials = req.body.meterials;
    Recipe.steps = req.steps;
    Recipe.userId = req.user._id;
    Recipe.likeNum = req.body.likeNum;
    Recipe.favorateNum = req.body.favorateNum;

    if (!(req.body.picture === undefined)) {
        var my_chance = new Chance();
        var guid = my_chance.guid();
        Recipe.photo = "uploads/" + guid + ".png";
        var base64Data = req.body.picture.replace(/^data:image\/png;base64,/, "");
        fs.writeFile('uploads/' + guid + '.png', base64Data, 'base64', function (err) {
            if (err)
                res.status(400).json(err);
            else {
                Recipe.userId = req.user._id;
                Recipe.save(function (err) {
                    if (err)
                        res.status(400).json(err);
                    else
                        res.status(201).json(Recipe);
                });
            }
        });
    }
    else {
        Recipe.userId = req.user._id;
        Recipe.save(function (err) {
            if (err)
                res.status(400).json(err);
            else
                res.status(201).json(Recipe);
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
    Recipe.find({_id: req.params.recipe_id}, function (err, Recipe) {
        if (err)
            res.status(400).json(err);
        else if (!Recipe)
            res.status(404).end();
        else
            res.status(200).json(Recipe);
    });
};

exports.putRecipe = function (req, res) {
    Recipe.update({_id: req.params.Recipe_id}, {
        name : req.body.name,
        description : req.body.description,
        calorie : req.body.calorie,
        meterials: req.body.meterials,
        steps : req.steps,
        userId : req.user._id,
        likeNum : req.body.likeNum,
        favorateNum : req.body.favorateNum
    }, function (err, num, raw) {
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
