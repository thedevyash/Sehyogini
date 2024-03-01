const express=require("express");
const jwt=require("jsonwebtoken");
const User = require("../models/user");
// const auth = require("../middlewares/auth");
const authRouter=express.Router();

authRouter.post('/api/signup',async (req,res)=>{
try{
const {name,email,profilePic,password,city,state}=req.body;

let user=await User.findOne({email:email});

if(!user){

    user=new User({
        email:email,
        name:name,
        profilePic:profilePic,
        password:password,
        city:city,
        state:state
    });
    user=await user.save();
}
const token= jwt.sign({id:user._id},"passwordKey");

res.json({user:user,token:token});

}catch(e){
res.status(500).json({error:e.message});
}
});

// authRouter.get('/',auth,async(req,res)=>{

//     const user = await User.findById(req.user);
//     res.json({user,token:req.token});

// });

module.exports=authRouter;
