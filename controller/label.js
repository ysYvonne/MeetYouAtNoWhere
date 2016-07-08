var Label = require('../models/label');
var Chance = require('chance');
var fs = require('fs-extra');

exports.postLabels = function(req,res){
	var label = new Label();
	label.content = req.body.content;

    label.save(function (err) {
        if (err)
            res.status(400).json(err);
        else
            res.status(201).json(label);
    });  
};

exports.getLabels = function (req, res) {
    label.find({}, function (err, labels) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(labels);
    });
};

exports.getLabel = function (req, res) {
    label.find({_id: req.params.label_id}, function (err, label) {
        if (err)
            res.status(400).json(err);
        else if (!label)
            res.status(404).end();
        else
            res.status(200).json(label);
    });
};

exports.putLabel = function (req, res) {
    label.update({_id: req.params.label_id}, {
        content  : req.body.content
    }, function (err, num, raw) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};

exports.deleteLabel = function (req, res) {
    label.remove({_id: req.params.label_id}, function (err) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};
