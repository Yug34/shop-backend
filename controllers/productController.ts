let Product = require("../models/product");
const fs = require("fs");
let path = require("path");
const { body, validationResult } = require("express-validator");

exports.list_products = function (req, res, next) {
  Product.find().exec((err, products) => {
    if (err) {
      return next(err);
    }
    res.jsonp(products);
  });
};

exports.product = function (req, res, next) {
  Product.findById(req.params.id).exec((err, products) => {
    if (err) {
      return next(err);
    }
    res.jsonp(products);
  });
};

exports.display_get = function (req, res) {
  Product.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send(`An error occurred: ${err}`);
    } else {
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
  // body("image", "The image cannot be empty").notEmpty(),

  (req, res, next) => {
    const errors = validationResult(req);

    let obj = {
      name: req.body.name,
      description: req.body.description,
      quantity: req.body.quantity,
      price: req.body.price,
      image: {
        data: fs.readFileSync(
          path.join(
            path.resolve(__dirname, "../..") + "/uploads/" + req.file.filename
          )
        ),
        contentType: "image/png",
      },
    };

    if (!errors.isEmpty()) {
      console.log(errors);

      // There are errors. Render form again with sanitized values and error messages.
      Product.find().exec(function (err, items) {
        if (err) {
          return next(err);
        }
        // Successful, so render.
        // TODO: handle error
        res.render("imagesPage", { items: items, errors: errors.array() });
      });
      return;
    }

    Product.create(obj, (err, item) => {
      if (err) {
        console.log(err);
      } else {
        item.save();
        res.redirect("http://localhost:3000");
      }
    });
  },
];
