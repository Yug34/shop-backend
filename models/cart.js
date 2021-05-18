"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require("mongoose"), Schema = _a.Schema, model = _a.model;
module.exports = model("Cart", new Schema({
    cartItems: [
        { product: { type: Schema.Types.ObjectId, ref: "Product" } },
        { quantity: { type: Number, required: true } },
    ],
}));
