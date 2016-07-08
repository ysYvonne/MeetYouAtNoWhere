var User_Label = require('../models/user_Label');
var fs = require('fs-extra');

exports.postUser_Labels = function (req, res) {

    var user_Label = new User_Label();
    user_Label.userId = req.user._id;
    user_Label.labelId = req.body.label_id;

    User_Label.save(function (err) {
            if (err)
                res.status(400).json(err);
            else
                res.status(201).json(User_Label);
        });
};

exports.getuser_Labels = function (req, res) {
    User_Label.find({}, function (err, User_Labels) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(User_Labels);
    });
};

exports.getuser_Label = function (req, res) {
    User_Label.find({_id: req.params.User_Label_id}, function (err, User_Label) {
        if (err)
            res.status(400).json(err);
        else if (!user_Label)
            res.status(404).end();
        else
            res.status(200).json(User_Label);
    });
};

exports.deleteuser_Label = function (req, res) {
    User_Label.remove({_id: req.params.User_Label_id}, function (err) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};
