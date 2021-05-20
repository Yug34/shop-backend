"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require("mongoose"), Schema = _a.Schema, model = _a.model;
module.exports = model("Product", new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    image: {
        data: Buffer,
        contentType: String
    }
}));
