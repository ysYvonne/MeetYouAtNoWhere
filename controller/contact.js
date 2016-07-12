var Contact = require('../models/contact');
var Chance = require('chance');
var fs = require('fs-extra');

exports.postContacts = function (req, res) {
    var contact = new Contact();

    contact.name = req.body.name;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    contact.comments = req.body.comments;

    contact.save(function (err) {
        if (err)
            res.status(400).json(err);
        else
            res.status(201).json(contact);
    });
};

exports.getContacts = function (req, res) {
    contact.find(function (err, contacts) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(contacts);
    });
};

exports.getContact = function (req, res) {
    contact.find({_id: req.params.contact_id}, function (err, contact) {
        if (err)
            res.status(400).json(err);
        else if (!contact[0])
            res.status(404).end();
        else
            res.status(200).json(contact);
    });
};

exports.deleteContact = function (req, res) {
    contact.remove({_id: req.params.contact_id}, function (err) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};
