"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Product = require("../models/product");
var fs = require("fs");
var path = require("path");
var express_validator_1 = require("express-validator");
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
exports.product_delete = function (req, res, next) {
    Product.findByIdAndDelete(req.params.id, function (err) {
        if (err) {
            next(err);
        }
        else {
            res.redirect("http://localhost:3000");
        }
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
    express_validator_1.body("name", "Name of product must be specified")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    express_validator_1.body("description", "Description is required").trim().isLength({ min: 1 }).escape(),
    express_validator_1.body("quantity", "Quantity must be specified")
        .isInt({ min: 1 })
        .notEmpty()
        .escape(),
    express_validator_1.body("price", "Price must be specified")
        .isInt({ min: 1 })
        .notEmpty()
        .escape(),
    function (req, res, next) {
        var errors = express_validator_1.validationResult(req);
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
                res.render("imagesPage", { items: items, errors: errors.array() });
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
