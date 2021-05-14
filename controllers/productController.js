var Product = require('../models/product');
// var Cart = require('../models/cart');

exports.list_products = function(req, res, next) {
    Product.find()
        .exec((err, products) => {
            if (err) {
                return next(err);
            }
            res.jsonp(products);
        });

};
