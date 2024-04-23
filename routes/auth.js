const express=require("express");
const User = require("../models/user");
const bcrypt=require("bcrypt");
const authRouter=express.Router();

authRouter.post('/api/signup',async (req,res)=>{
try{
const {name,email,phone,profilePic,dob,password,city,state,acctype,details}=req.body;

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
        acctype:acctype,dob:dob,details:details
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

authRouter.post('/api/gender',async(req,res)=>{


 const {url}=req.body
//index.js file

///////////////////////////////////////////////////////////////////////////////////////////////////
// In this section, we set the user authentication, user and app ID, model details, and the URL
// of the image we want as an input. Change these strings to run your own example.
///////////////////////////////////////////////////////////////////////////////////////////////////

// Your PAT (Personal Access Token) can be found in the Account's Security section
const PAT = '7af8440caf614245b2d0c25be57702aa';
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = 'clarifai';
const APP_ID = 'main';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'gender-demographics-recognition';
const MODEL_VERSION_ID = 'ff83d5baac004aafbe6b372ffa6f8227';
const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';

///////////////////////////////////////////////////////////////////////////////////
// YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
///////////////////////////////////////////////////////////////////////////////////


try
{

  const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

  const stub = ClarifaiStub.grpc();
  
  // This will be used by every Clarifai endpoint call
  const metadata = new grpc.Metadata();
  metadata.set("authorization", "Key " + PAT);
  
  stub.PostModelOutputs(
      {
          user_app_id: {
              "user_id": USER_ID,
              "app_id": APP_ID
          },
          model_id: MODEL_ID,
          version_id: MODEL_VERSION_ID, // This is optional. Defaults to the latest model version
          inputs: [
              { data: { image: { url: IMAGE_URL, allow_duplicate_url: true } } }
          ]
      },
      metadata,
      (err, response) => {
          if (err) {
              throw new Error(err);
          }
  
          if (response.status.code !== 10000) {
              throw new Error("Post model outputs failed, status: " + response.status.description);
          }
  
          // Since we have one input, one output will exist here
          const output = response.outputs[0];
  
          console.log("Predicted concepts:");
          for (const concept of output.data.concepts) {
              console.log(concept.name + " " + concept.value);
              if(concept.name=="Feminine")
              {
                if(concept.value>0.6)
                {
                  return res.status(200).json({"isFemale":"true"});
              }
              else
              {
                return res.status(200).json({"isFemale":"false"});
              }
              }
             
          }
         

      }
  );  

}
catch(e)
{
    return res.status(500).json({error:e.message});

}
}
);

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
