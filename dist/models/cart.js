"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CartSchema = new Schema({
    cartItems: [
        { product: { type: Schema.Types.ObjectId, ref: "Product" } },
        { quantity: { type: Number, required: true } },
    ],
});
module.exports = mongoose.model("Cart", CartSchema);
