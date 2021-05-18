"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    image: {
        data: Buffer,
        contentType: String,
    },
});
module.exports = mongoose.model("Product", ProductSchema);
