const express=require("express");
const jwt=require("jsonwebtoken");
const User = require("../models/user");
// const auth = require("../middleware/auth");
const authRouter=express.Router();

authRouter.post('/api/signup',async (req,res)=>{
try{
const {name,email,phone,profilePic,password,city,state}=req.body;

let user=await User.findOne({phone:phone});

if(!user){

    user=new User({
        email:email,
        name:name,
        phone:phone,
        profilePic:profilePic,
        password:password,
        city:city,
        state:state
    });
    user=await user.save();
    return res.status(200).json({id:user._id});
}
else
{
    return res.status(201).json({"mssg":"User Exists"});
}
// const token= jwt.sign({id:user._id},"passwordKey");



}catch(e){
return res.status(500).json({error:e.message});
}
});



authRouter.post('/api/signin',async(req,res)=>{
const {phone,password}=req.body;
try{
    if(phone)
{
let user=await User.findOne({phone:phone});
console.log(user);
if(!user)
{
   return res.status(401).json({"mssg":"User Not Found"});
}
else
{
    console.log(user['password']);
    if(password==user['password'])
    {
        return res.status(200).json({"mssg":"Successfully Logged In","id":user._id})
    }
    else{
        return res.status(201).json({"mssg":"Wrong Password Entered"});
    }
}
}
}catch(e)
{
    res.status(500).json({error:e.message});
}
});

// authRouter.get('/',auth,async(req,res)=>{

//     const user = await User.findById(req.user);
//     res.json({user,token:req.token});

// });

module.exports=authRouter;
