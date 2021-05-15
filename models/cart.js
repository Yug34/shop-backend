let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let CartSchema = new Schema({
  cartItems: [
    { product: { type: Schema.Types.ObjectId, ref: "Product" } },
    { quantity: { type: Number, required: true } },
  ],
});

module.exports = mongoose.model("Cart", CartSchema);
