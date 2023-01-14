const router = require("express").Router();
const Product = require("../models/productModel")


router.post("/add-product", async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
});


router.get("/products", async (req, resp) => {
    const products = await Product.find({ userId : req.headers.authorization});
    if (products.length > 0) {
        resp.send(products)
    } 
    else {
        resp.send({ result: "No Product found" })
    }
});


router.delete("/product/:id", async (req, resp) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result)
});


router.get("/product/:id", async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id })
    if (result) {
        resp.send(result)
    } 
    else {
        resp.send({ "result": "No Record Found." })
    }
})


router.put("/product/:id", async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    resp.send(result)
});


router.get("/search/:key", async (req, resp) => {
    let result = await Product.find({
        "$or": [
            {
                name: { $regex: req.params.key }  
            },
            {
                company: { $regex: req.params.key }
            },
            {
                category: { $regex: req.params.key }
            }
        ]
    });
    resp.send(result);
});


module.exports = router;