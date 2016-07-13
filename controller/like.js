var Like = require('../models/like');
var Chance = require('chance');
var fs = require('fs-extra');

exports.postLikes = function (req, res) {

    var like = new Like();
    like.recipeId = req.body.recipe_id;
    like.userId = req.user._id;

    like.save(function (err) {
        if (err)
            res.status(400).json(err);
        else
            res.status(201).json(like);
    });
};

exports.getLikes = function (req, res) {
    Like.find({}, function (err, likes) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(likes);
    });
};

exports.getLike = function (req, res) {
    Like.find({_id: req.params.like_id}, function (err, like) {
        if (err)
            res.status(400).json(err);
        else if (!like)
            res.status(404).end();
        else
            res.status(200).json(like);
    });
};

exports.deleteLike = function (req, res) {
    Like.remove({_id: req.params.like_id}, function (err) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};
