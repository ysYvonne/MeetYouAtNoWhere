var Recipe = require('../models/recipe');
var Chance = require('chance');
var fs = require('fs-extra');

exports.postRecipes = function (req, res) {
    var recipe = new Recipe();
    recipe.name = req.body.name;
    recipe.description = req.body.description;
    recipe.calorie = req.body.calorie;
    recipe.makeTime = req.body.makeTime;
    recipe.peopleNum = req.body.peopleNum;
    recipe.meterials = req.body.meterials;
    recipe.steps = req.body.steps;
    recipe.level = req.body.level;
    recipe.labels = req.body.labels;
    recipe.userId = req.user._id;
    recipe.noMeat = req.body.noMeat;
    recipe.noSugar = req.body.noSugar;
    recipe.lowFat = req.body.lowFat;
    recipe.spicy = req.body.spicy;
    recipe.noLactose = req.body.noLactose;
    recipe.lowCal = req.body.lowCal;
    var file = req.files.picture;

    if (!(req.files.picture === undefined)) {

        var my_chance = new Chance();
        var guid = my_chance.guid();
        var type=req.files.picture.type.split('/')[1];
        recipe.photo = guid + "."+type;
        // console.log(recipe.photo);
        // var base64Data = req.files.picture.replace(/^data:image\/png;base64,/, "");
        fs.renameSync(req.files.picture.path, "./uploads/"+recipe.photo);
        // fs.writeFile(recipe.photo, file, 'base64' ,function (err) {
            // if (err)
            //     res.status(400).json(err);
            // else {
                recipe.save(function (err) {
                    if (err)
                        res.status(400).json(err);
                    else
                        res.status(201).json(recipe);
                });
        //     }
        // });
    }
    else {
        recipe.save(function (err) {
            if (err)
                res.status(400).json(err);
            else
                res.status(201).json(recipe);
        });
    }
        // }
};

exports.getRecipes = function (req, res) {
    Recipe.find({}, function (err, recipes) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(recipes);
    });
};

exports.getOwnRecipes = function (req, res) {
    Recipe.find({userId: req.params.user_id}, function (err, recipes) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(recipes);
    });
};

exports.getRecipesByType = function (req, res) {
    var type = "主菜";
    if(req.params.type === "entree")
    {
        type = "主菜";
    }
    else if(req.params.type === "drink")
    {
        type = "饮料";
    }
    else if(req.params.type === "desert")
    {
        type = "甜点";
    }
    else if(req.params.type === "snack")
    {
         type = "小吃";
    }
    else if(req.params.type === "fish")
    {
        type = "海鲜";
    }
    else 
    {
        type = "西餐";
    }
    Recipe.find({labels:type}, function (err, recipes) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(recipes);
        });
};

exports.getRecipesByLabel = function (req, res) {
    if(req.params.label == "noMeat")
    {
         Recipe.find({noMeat:true}, function (err, recipes) {
            if (err)
                res.status(400).json(err);
            else
                res.status(200).json(recipes);
        });
    }
    else if(req.params.label == "noSugar")
    {
         Recipe.find({noSugar:true}, function (err, recipes) {
            if (err)
                res.status(400).json(err);
            else
                res.status(200).json(recipes);
        });
    }
    else if(req.params.label == "spicy")
    {
         Recipe.find({spicy:true}, function (err, recipes) {
            if (err)
                res.status(400).json(err);
            else
                res.status(200).json(recipes);
        });
    }
    else if(req.params.label == "lowFat")
    {
         Recipe.find({lowFat:true}, function (err, recipes) {
            if (err)
                res.status(400).json(err);
            else
                res.status(200).json(recipes);
        });
    }
    else if(req.params.label == "lowCal")
    {
         Recipe.find({lowCal:true}, function (err, recipes) {
            if (err)
                res.status(400).json(err);
            else
                res.status(200).json(recipes);
        });
    }
    else 
    {
        Recipe.find({noLactose:true}, function (err, recipes) {
            if (err)
                res.status(400).json(err);
            else
                res.status(200).json(recipes);
        });
    }
   
};

exports.getRecipe = function (req, res) {
    Recipe.find({_id: req.params.recipe_id}, function (err, recipe) {
        if (err)
            res.status(400).json(err);
        else if (!recipe)
            res.status(404).end();
        else
            res.status(200).json(recipe);
    });
};

exports.putRecipeLike = function (req, res) {
    Recipe.update({_id: req.params.recipe_id}, {
        likeNum:req.body.likeNum
    },function (err, num, raw) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};

exports.putRecipeStatus = function (req, res) {
    Recipe.update({_id: req.params.recipe_id}, {
        status:1
    },function (err, num, raw) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};

exports.putRecipe = function (req, res) {
     if (!(req.files.picture === undefined)) {

        var my_chance = new Chance();
        var guid = my_chance.guid();
        var type=req.files.picture.type.split('/')[1];
        var photo = guid + "."+type;
        fs.renameSync(req.files.picture.path, "./uploads/"+photo);
   
    }
    Recipe.update({_id: req.params.recipe_id}, {
        name : req.body.name,
        description : req.body.description,
        calorie : req.body.calorie,
        makeTime : req.body.makeTime,
        peopleNum : req.body.peopleNum,
        meterials: req.body.meterials,
        steps : req.body.steps,
        labels:req.body.labels,
        level :req.body.level,
        photo:photo
    },function (err, num, raw) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};

exports.deleteRecipe = function (req, res) {
    Recipe.remove({_id: req.params.recipe_id}, function (err) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};
