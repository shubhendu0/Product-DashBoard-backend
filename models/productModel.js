const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        userId:{
            type: String,
        },
        name: {
            type: String,
            required: [true, "Please add a name"],
        },
        price: {
            type: Number,
            required: [true, "Please add the price"],
        },
        category: {
            type: String,
            required: [true, "Please add the category"],
        },      
        company:{
            type: String,
            required: [true, "Please add a company name"],
        },
    }
);

const productModel = mongoose.model("products", productSchema);
module.exports = productModel;