const express = require("express");
const { userAuth } = require("../middlewares/auth.middleware");
const { ProductModel } = require("../models/product.model");
const { UserModel } = require("../models/user.model");

const cartRouter = express.Router();


//Route to get all the cart products
cartRouter.get("/",userAuth, async(req,res)=>{
    let userId=req.body.userID
    
    try {
     let user = await UserModel.findOne({_id:userId});
     let productIds = user.cart.map((item=> item.product)) 
     let products = await ProductModel.find({_id:productIds})
     res.status(200).send(products)
    } catch (error) {
        res.status(400).send({msg:error.message})
    }

});

//Route to add products to cart
cartRouter.post("/add",userAuth,async(req,res)=>{
    let {productId,quantity} = req.body
try {  
    const user = await UserModel.findOne({_id:req.body.userID})    
    const product = await ProductModel.findById(productId);
    const cartItem = { product: product._id, quantity: quantity };
    const itemExists = user.cart.some((item)=> item.product === productId) 
    
    if(itemExists){
        console.log(user.cart)
     res.status(400).send({msg:"Product already in cart"});
    }
    else{
        user.cart.push(cartItem);
        await user.save();
        res.status(200).send({msg:"Product added to cart"})
    }
    
} catch (error) {
    res.status(400).send({err:error.message})
}
});

// Route to remove products from the cart
cartRouter.delete("/remove/:productId",userAuth,async(req,res)=>{
    let productId = req.params.productId
try {  
    const user = await UserModel.findOne({_id:req.body.userID})    
 const cartItemIndex = user.cart.findIndex(item => item.product.equals(productId));
  user.cart.pull(user.cart[cartItemIndex]._id);
await user.save();
res.status(200).send({msg:"Product removed from cart"})
} catch (error) {
    res.status(400).send({err:error.message})
}
});


// Route to remove product from cart and add to orders 
cartRouter.patch("/ordered",userAuth,async(req,res)=>{
    let {productId,quantity,userID} = req.body
    
    try {
        const user = await UserModel.findById(userID);
    
        if (!user) {
          return res.status(404).send({msg:'User not found'});
        }
    
        const product = await ProductModel.findById(productId);
    
        if (!product) {
          return res.status(404).send({msg:'Product not found'});
        }
        user.orders.push({product:productId});

        const cartItemIndex = user.cart.findIndex(item => item.product.equals(productId));
         user.cart.pull(user.cart[cartItemIndex]._id);

        await user.save();
    
        return res.send({msg:"Order add success"});
      } catch (err) {
        console.error(err);
        return res.status(500).send({msg:err.message});
      }
})


//Route to get all the orders

cartRouter.get("/orders",(req,res)=>{

})









module.exports ={cartRouter}