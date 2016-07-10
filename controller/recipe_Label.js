var Recipe_Label = require('../models/recipe_Label');
var fs = require('fs-extra');

exports.postRecipe_Labels = function (req, res) {

    var recipe_Label = new Recipe_Label();
    recipe_Label.recipeId = req.body.recipe_id;
    recipe_Label.labelId = req.body.label_id;

    recipe_Label.save(function (err) {
            if (err)
                res.status(400).json(err);
            else
                res.status(201).json(recipe_Label);
        });
};

exports.getrecipe_Labels = function (req, res) {
    Recipe_Label.find({}, function (err, Recipe_Labels) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(Recipe_Labels);
    });
};

exports.getrecipe_Label = function (req, res) {
    Recipe_Label.find({_id: req.params.Recipe_Label_id}, function (err, Recipe_Label) {
        if (err)
            res.status(400).json(err);
        else if (!recipe_Label)
            res.status(404).end();
        else
            res.status(200).json(Recipe_Label);
    });
};

exports.deleterecipe_Label = function (req, res) {
    Recipe_Label.remove({_id: req.params.Recipe_Label_id}, function (err) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};
