var Follow = require('../models/follow');
var Chance = require('chance');
var fs = require('fs-extra');

exports.postFollows = function (req, res) {
    var follow = new Follow();

    follow.followId = req.body.followuser_id;
    follow.followerId = req.user._id;
    follow.save(function (err) {
        if (err)
            res.status(400).json(err);
        else
            res.status(201).json(follow);
    });
};

exports.getFollows = function (req, res) {
    Follow.find(function (err, follows) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(follows);
    });
};

exports.getFollow = function (req, res) {
    Follow.find({_id: req.params.follow_id}, function (err, follow) {
        if (err)
            res.status(400).json(err);
        else if (!follow[0])
            res.status(404).end();
        else
            res.status(200).json(follow);
    });
};

exports.deleteFollow = function (req, res) {
    Follow.remove({_id: req.params.follow_id}, function (err) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};
