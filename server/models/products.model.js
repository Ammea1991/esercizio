const mongoose = require("mongoose");

const Products = mongoose.model(
    "Products",
    new mongoose.Schema({
        title: String,
        description: String,
        price: Number,
        discountPercentage: Number,
        rating: Number,
        stock: Number,
        brand: String,
        category: String,
        thumbnail: String,
        images: []
    })
);

module.exports = Products;
