
const mongoose = require("mongoose");


const productSchema = ({
      
      name: { type: String, required: true},
      price: { type: Number, required: true},
      rating: { type: Number, required: true},
      userId: { type: String, required: true}
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel }
