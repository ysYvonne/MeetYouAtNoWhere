var Step = require('../models/step');
var Chance = require('chance');
var fs = require('fs-extra');

exports.postSteps = function (req, res) {

    var step = new Step();

    step.description = req.body.description;
    step.recipeId = req.body.recipe_id;

    if (!(req.body.picture === undefined)) {
        var my_chance = new Chance();
        var guid = my_chance.guid();
        step.photo = "uploads/" + guid + ".png";
        var base64Data = req.body.picture.replace(/^data:image\/png;base64,/, "");
        fs.writeFile('uploads/' + guid + '.png', base64Data, 'base64', function (err) {
            if (err)
                res.status(400).json(err);
            else {
                step.save(function (err) {
                    if (err)
                        res.status(400).json(err);
                    else
                        res.status(201).json(step);
                });
            }
        });
    }
    else {
        step.save(function (err) {
            if (err)
                res.status(400).json(err);
            else
                res.status(201).json(step);
        });
    }
};

exports.getSteps = function (req, res) {
    Step.find({}, function (err, Steps) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(Steps);
    });
};

exports.getStep = function (req, res) {
    Step.find({_id: req.params.Step_id}, function (err, Step) {
        if (err)
            res.status(400).json(err);
        else if (!Step)
            res.status(404).end();
        else
            res.status(200).json(Step);
    });
};

exports.putSteps = function (req, res) {
    if (!(req.body.picture === undefined)) {
        var my_chance = new Chance();
        var guid = my_chance.guid();
        var photo="uploads/" + guid + ".png";
        var base64Data = req.body.picture.replace(/^data:image\/png;base64,/, "");
        fs.writeFile('uploads/' + guid + '.png', base64Data, 'base64', function (err) {
            if (err)
                res.status(400).json(err);
        });
    };
    Step.update({_id: req.params.Step_id}, {
        
        description : req.body.description,
        photo:photo
        }, function (err, num, raw) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};

exports.deleteStep = function (req, res) {
    Step.remove({_id: req.params.Step_id}, function (err) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};
