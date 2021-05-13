var Product = require('../models/product');
const { body,validationResult } = require('express-validator');

// Display list of all BookInstances.


// Display detail page for a specific BookInstance.
exports.index = function(req, res, next) {

    // Product.find({}, "title author")
    //     .exec(function (err, list_books) {
    //         if (err) {
    //             return next(err);
    //         }
    //         // console.log(list_books)
    //         //Successful, so render
    //     });
    res.send("Here!");
};
