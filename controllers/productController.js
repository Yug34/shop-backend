var Product = require('../models/product');

// const { body, validationResult } = require('express-validator');

exports.index = function(req, res, next) {

    Product.find()
        .exec((err, products) => {
            if (err) {
                return next(err);
            }
            res.json({...products});
            console.log(products);
            console.log(Product.countDocuments());
        });

};
