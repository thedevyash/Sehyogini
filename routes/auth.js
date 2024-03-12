const express=require("express");
const User = require("../models/user");
const bcrypt=require("bcrypt");
const authRouter=express.Router();

authRouter.post('/api/signup',async (req,res)=>{
try{
const {name,email,phone,profilePic,dob,password,city,state,acctype}=req.body;

let user=await User.findOne({phone:phone});
const salt=await bcrypt.genSalt(10);
const pswd=await bcrypt.hash(password,salt);

if(!user){

    user=new User({
        email:email,
        name:name,
        phone:phone,
        profilePic:profilePic,
        password:pswd,
        city:city,
        state:state,
        acctype:acctype,dob:dob
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

if(!user)
{
   return res.status(401).json({"mssg":"User Not Found"});
}
else
{
  var result=await bcrypt.compare(password,user['password']);
  console.log(result);
    if(result)
    {
        return res.status(200).json({"mssg":"Successfully Logged In","id":user._id});
    }
    else{
        console.log(result);
        return res.status(201).json({"mssg":"Wrong Password Entered"});
    }
}
}
}catch(e)
{
 return res.status(500).json({error:e.message});
}
});


authRouter.get('/api/getUsers',async(req,res)=>{

    try{
     userList= await  User.find({});
     console.log(userList);
      return  res.status(200).json({users:userList});
    }catch(e){
    return res.status(500).json({error:e.message});
    }
 
 });


authRouter.get('/api/getUserByID/:id',async(req,res)=>{
try{
  userID=  req.params.id;

  searchUser=await User.find({_id:userID});
  console.log(searchUser);
  if(searchUser)
  {
    return res.status(200).json({user:searchUser[0]});
  }
  else
  {
    return res.status(400).json({"mssg":"Nahi Mila"});
  }
}catch(e)
{
return res.status(500).json({"mssg":e.message})
}
});


authRouter.get('/',async(req,res)=>{

   return res.status(200).json({"mssg":"Jai Shree Ram"});

});

module.exports=authRouter;
