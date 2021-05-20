import {NextFunction, Request, Response} from "express";

const Product = require("../models/product");
const fs = require("fs");
const path = require("path");
import { body, validationResult } from "express-validator";

interface MulterRequest extends Request {
  file: any;
}

exports.list_products = (req: Request, res: Response, next: NextFunction) => {
  Product.find().exec((err: any, products:object[]) => {
    if (err) {
      return next(err);
    }
    res.jsonp(products);
  });
};

exports.product = (req: Request, res: Response, next: NextFunction) => {
  Product.findById(req.params.id).exec((err: any, products:object[]) => {
    if (err) {
      return next(err);
    }
    res.jsonp(products);
  });
};

// exports.display_update = (req: Request, res: Response) => {
//   Product.findByIdAndUpdate({ _id: req.params.id }, () => {
//
//   });
// }

exports.product_delete = (req: Request, res: Response) => {
  Product.findByIdAndRemove({ _id: req.params.id }, (err: any) => {
    if(err) {
      console.log(err);
    } else {
      res.redirect("http://localhost:3000");
    }
  });
}

exports.display_get = (req: Request, res: Response) => {
  Product.find({}, (err: any, items:object[]) => {
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
    .isInt({ min: 1})
    .notEmpty()
    .escape(),
  body("price", "Price must be specified")
    .isInt({ min: 1})
    .notEmpty()
    .escape(),

  // body("image", "The image cannot be empty").notEmpty(),
  //TODO: resize image before storing

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    let obj: object = {
      name: req.body.name,
      description: req.body.description,
      quantity: req.body.quantity,
      price: req.body.price,
      image: {
        data: fs.readFileSync(
          path.join(
            path.resolve(__dirname, "../..") + "/uploads/" + (req as MulterRequest).file.filename
          )
        ),
        contentType: "image/png",
      },
    };

    if (!errors.isEmpty()) {
      console.log(errors);

      // There are errors. Render form again with sanitized values and error messages.
      Product.find().exec((err: any, items) => {
        if (err) {
          return next(err);
        }
        // Successful, so render.
        // TODO: handle error
        res.render("imagesPage", { items: items, errors: errors.array() });
      });
      return;
    }

    Product.create(obj, (err: any, item) => {
      if (err) {
        console.log(err);
      } else {
        item.save();
        res.redirect("http://localhost:3000");
      }
    });
  },
];
