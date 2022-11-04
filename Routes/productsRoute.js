
const { Router } = require("express");
const { Authenticate } = require("../Middlewares/Authenticate");
const { Authorise } = require("../Middlewares/Authorise");
const { ProductModel } = require("../Models/productModel");

const productRouter = Router();

productRouter.get("/read", async(req, res)=>{

    const allProducts = await ProductModel();
    
    res.send(allProducts)
});


productRouter.post("/create", Authenticate, Authorise(["seller", "admin"]), async(req, res)=>{
     
    const { userId } = req.body;
    console.log("userid",userId)
    const payload = {
                       ...req.body,
                       userId
                    }
    //console.log("payload",payload)
    const newProduct = new ProductModel(payload);
    console.log(newProduct);
    await newProduct.save()
    
    res.send({ "msg": "Product added successfully"})

})

productRouter.patch("/update:productId", Authenticate, Authorise(["seller", "admin"]), async(req, res)=>{
    
    const { userId } = req.body;

    const updatedProduct = await ProductModel.updateOne({ userId: userId, _id: req.params.productId}, { ...req.body});
    res.send({ "msg": "Product updated successfully"})
})

productRouter.delete("/delete:productId", Authenticate, Authorise(["seller", "admin"]), async(req, res)=>{
    
    const { userId } = req.body;

    const updatedProduct = await ProductModel.findByIdAndDelete({ userId: userId, _id: req.params.productId});
    res.send({ "msg": "Product deleted successfully"});
})

module.exports = { productRouter }