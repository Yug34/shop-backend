"use strict";
var Product = require("../models/product");
var fs = require("fs");
var path = require("path");
exports.list_products = function (req, res, next) {
    Product.find().exec(function (err, products) {
        if (err) {
            return next(err);
        }
        res.jsonp(products);
    });
};
exports.product = function (req, res, next) {
    Product.findById(req.params.id).exec(function (err, products) {
        if (err) {
            return next(err);
        }
        res.jsonp(products);
    });
};
exports.display_get = function (req, res) {
    Product.find({}, function (err, items) {
        if (err) {
            console.log(err);
            res.status(500).send("An error occurred: " + err);
        }
        else {
            res.render("imagesPage", { items: items });
        }
    });
};
exports.display_post = function (req, res, next) {
    var obj = {
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price,
        image: {
            data: fs.readFileSync(path.join(path.resolve(__dirname, "../..") + "/uploads/" + req.file.filename)),
            contentType: "image/png",
        },
    };
    Product.create(obj, function (err, item) {
        if (err) {
            console.log(err);
        }
        else {
            item.save();
            res.redirect("http://localhost:6969/");
        }
    });
};
