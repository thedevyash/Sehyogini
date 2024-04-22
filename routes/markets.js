const express=require("express");
const Product = require("../models/products");
const productRouter=express.Router();

productRouter.post('/api/addProduct',async(req,res)=>{
    try{
        const {productName,seller,productCategory,stock,description,details,productImage}=req.body;
        product= new Product(
            {productName,seller,productCategory,stock,description,details,productImage});
          
            // var x=jobcategory;
           
            product= product.save();
         
         
    
            return res.status(200).json({"mssg":"Product added Successfully","id":product._id});
    }catch(e){
    return res.status(500).json({"mssg":e.message});
    }
    });


    productRouter.get('/api/getProduct',async(req,res)=>{

        try{
         productList= await  Product.find({});
        
          return  res.status(200).json({products:productList});
        }catch(e){
        return res.status(500).json({error:e.message});
        }
     
     });


     productRouter.post('/api/addToCart/:userId/:productId', async (req, res) => {
        try {
          const { userId, productId } = req.params;
      
          // Find the user
          const user = await User.findById(userId);
      
          // Check if the product is already in the cart
          const cartItem = user.cart.find(item => item.product.toString() === productId);
      
          if (cartItem) {
            // If the product is already in the cart, increase the quantity
            cartItem.quantity++;
          } else {
            // If the product is not in the cart, add it
            user.cart.push({ product: productId, quantity: 1 });
          }
      
          // Save the updated user
          await user.save();
      
          res.status(200).json({ message: 'Product added to cart' });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      });


      productRouter.delete('/api/removeFromCart/:userId/:productId', async (req, res) => {
        try {
          const { userId, productId } = req.params;
      
          // Find the user
          const user = await User.findById(userId);
      
          // Find the product in the cart
          const cartItemIndex = user.cart.findIndex(item => item.product.toString() === productId);
      
          if (cartItemIndex > -1) {
            // If the product is in the cart, remove it
            user.cart.splice(cartItemIndex, 1);
          } else {
            // If the product is not in the cart, send an error message
            return res.status(400).json({ message: 'Product not found in cart' });
          }
      
          // Save the updated user
          await user.save();
      
          res.status(200).json({ message: 'Product removed from cart' });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      });

    module.exports=productRouter;
