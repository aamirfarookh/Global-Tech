const express = require("express");
const { userAuth, adminAuth } = require("../middlewares/auth.middleware");
const { ProductModel } = require("../models/product.model");
const { UserModel } = require("../models/user.model");

const productRouter = express.Router()



productRouter.post("/add",adminAuth,async(req,res)=>{
    let {name,description,image,price,brand,category,countInStock,model,specs} = req.body;
    try {
        if(name && description && image && price && brand && category && countInStock && model && specs){
            const newProduct = new ProductModel(req.body);
            await newProduct.save();
            res.status(201).send({msg:"New product added successfully"})
        }
        else{
            res.status(400).send({msg:"Please fill all the details"})
        }
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
});

// ROUTE FOR GETTING ALL THE PRODUCTS
productRouter.get("/", async(req,res)=>{
    let {category,search,sort,page,limit} = req.query
    let query = {};
    if(category){
        query.category = category
    }
    if(search){
        query.name ={$regex:search,$options:"i"}
    }
    
    let value;
    if(sort === "asc"){
        value= 1
    }
    else if(sort==="desc"){
        value = -1
    }
    const skip = (+page -1)*limit 
    
    try {
        const totalProducts = await ProductModel.find(query)
        const products =await ProductModel.find(query).sort({price:value}).skip(skip).limit(limit);
        req.headers.count = 13
        res.status(200).send({data:products,  "total": totalProducts.length,
        "limit": 3,
        "page":page})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})







module.exports = {productRouter}




// {
//     "name":"Apple iPhone 13",
//       "description":"15 cm (6.1-inch) Super Retina XDR display Cinematic mode adds shallow depth of field and shifts focus automatically in your videos Advanced dual-camera system with 12MP Wide and Ultra Wide cameras; Photographic Styles, Smart HDR 4, Night mode, 4K Dolby Vision HDR recording 12MP TrueDepth front camera with Night mode, 4K Dolby Vision HDR recording A15 Bionic chip for lightning-fast performance",
//       "image":["https://m.media-amazon.com/images/I/71xb2xkN5qL._SL1500_.jpg","https://m.media-amazon.com/images/I/61CAYVr34QL._SL1500_.jpg","https://m.media-amazon.com/images/I/81junVbiuyL._SL1500_.jpg","https://m.media-amazon.com/images/I/71G44HUh7yL._SL1500_.jpg","https://m.media-amazon.com/images/I/81-hHbjQGSL._SL1500_.jpg","https://m.media-amazon.com/images/I/61wIVtrz54L._SL1500_.jpg"],
//       "price":61999,
//       "brand":"Apple",
//       "category":"Mobile Phones",
//       "countInStock":83,
//       "model": "Iphone13",
//       "specs":["	6.1-inch (15.5 cm diagonal) Super Retina XDR display","Dual 12MP camera system (Ultra Wide and Wide)","12MP TrueDepth camera","Face ID","A15 Bionic chip,4-core CPU with 2 performance cores and 4 efficiency cores, 5-core GPU, 16-core Neural Engine","Rated IP68 (maximum depth of 6 meters up to 30 minutes) under IEC standard 60529","Compatible with MagSafe accessories and Qi wireless chargers"]
      
//    }