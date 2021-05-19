"use strict";
var Product = require("../models/product");
var fs = require("fs");
var path = require("path");
var _a = require("express-validator"), body = _a.body, validationResult = _a.validationResult;
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
exports.display_post = [
    body("name", "Name of product must be specified")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("description", "Description is required").trim().isLength({ min: 1 }).escape(),
    body("quantity", "Quantity must be specified")
        .isDecimal({ min: 1 })
        .notEmpty()
        .escape(),
    body("price", "Price must be specified")
        .isDecimal({ min: 1 })
        .notEmpty()
        .escape(),
    //TODO:
    body("image", "Upload a png")
	.notEmpty();

    function (req, res, next) {
        var errors = validationResult(req);
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
        if (!errors.isEmpty()) {
            console.log(errors);
            Product.find().exec(function (err, items) {
                if (err) {
                    return next(err);
                }
                //res.render("imagesPage", { items: items, errors: errors.array() });
		res.redirect("http://localhost:3000")
            });
            return;
        }
        Product.create(obj, function (err, item) {
            if (err) {
                console.log(err);
            }
            else {
                item.save();
                res.redirect("http://localhost:3000");
            }
        });
    },
];
