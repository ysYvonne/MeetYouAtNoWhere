var Own = require('../models/own');
var fs = require('fs-extra');

exports.postOwns = function (req, res) {

    var own = new Own();
    own.recipeId = req.body.recipe_id;
    own.userId = req.user._id;
    own.status = 0;

    own.save(function (err) {
            if (err)
                res.status(400).json(err);
            else
                res.status(201).json(own);
        });
};

exports.getowns = function (req, res) {
    Own.find({}, function (err, Owns) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(Owns);
    });
};

exports.getown = function (req, res) {
    Own.find({_id: req.params.Own_id}, function (err, Own) {
        if (err)
            res.status(400).json(err);
        else if (!own)
            res.status(404).end();
        else
            res.status(200).json(Own);
    });
};

exports.putown = function (req, res) {
    Own.update({_id: req.params.Own_id}, {
        status:req.body.status
    }, function (err, num, raw) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};

exports.deleteown = function (req, res) {
    Own.remove({_id: req.params.Own_id}, function (err) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};
