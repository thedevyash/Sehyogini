const express=require("express");
const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require("../models/like");
const Follow = require("../models/follow");
const User=require("../models/user");
const postRouter=express.Router();

postRouter.post('/api/createPost',async(req,res)=>{
const {title,author,authorID,content,comments,likes,authorType}=req.body;
var filters={};

try{

    const PAT = 'f0926fb0e98942e6b5037257f571d473';

    const USER_ID = 'clarifai';
    const APP_ID = 'main';
    
    const MODEL_ID = 'moderation-multilingual-text-classification';
    const MODEL_VERSION_ID = '79c2248564b0465bb96265e0c239352b';
    const RAW_TEXT = content;
    const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");
    
    const stub = ClarifaiStub.grpc();
    
    const metadata = new grpc.Metadata();
    metadata.set("authorization", "Key " + PAT);
    
    if(await !filters==null)
    console.log("outside");
console.log(filters);


   
   
   await stub.PostModelOutputs(
    {
        user_app_id: {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        model_id: MODEL_ID,
        version_id: MODEL_VERSION_ID, 
        inputs: [
            {
                "data": {
                    "text": {
                        "raw": RAW_TEXT

                    }
                }
            }
        ]
    },
    metadata,
    async (err, response) => {
        if (err) {
            throw new Error(err);
        }

        if (response.status.code !== 10000) {
            throw new Error("Post model outputs failed, status: " + response.status.description);
        }

        const output = response.outputs[0];

        console.log("Predicted concepts:");
        for (const concept of output.data.concepts) {

            // filter.set(concept.name,concept.value);
         filters[concept.name]=concept.value;
            console.log(filters);
            console.log(concept.name + " " + concept.value);
       
        }
        if(filters['toxic']>0.75)
        return  res.status(200).json({"isposted":false});
        else
        { post=new Post({
            author:author,
            authorID:authorID,authorType:authorType,
            content:content,
            title:title,
            comments:comments,
            likes:likes
        });
            post=await post .save();
            await User.findOneAndUpdate({_id:authorID},{$push:{myposts:post}});
            return  res.status(200).json({"author":author,"postID":post._id,"isposted":true});
        }
     
       
    }
   
   
);
    
}catch(e)
{
    return res.status(500).json({"mssg":e.message,"filters":filters});
}
});



postRouter.get('/api/getPosts',async(req,res)=>{

    try{
     postList=  await Post.find({});

      return  res.status(200).json({posts:postList});
    }catch(e){
    return res.status(500).json({error:e.message});
    }
 
 }
 );

 postRouter.get('/api/getPostByID/:id',async(req,res)=>{
    try{
      postID=  req.params.id;
    
      searchPost=await Post.find({_id:postID});
      if(searchPost)
      {
        return res.status(200).json({user:searchPost[0]});
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

//  postRouter.post('/api/do-comment',async(req,res)=>{
//     const {id,comment}=req.body;
//     try{
       
//        if(likes!=null)
//        {
//        PostInteraction.updateOne({id:id},{})
//        }
//         return res.status(200).json({"author":author,"postID":post._id});
//     }catch(e)
//     {
//         return res.status(500).json({"mssg":e.message});
//     }
//     });
    
postRouter.post("/api/do-comment", async (req,res) =>{  
        
    const comment = new Comment({name:req.body.name, comment:req.body.comment});

    var filters={};

    try{

        const PAT = 'f0926fb0e98942e6b5037257f571d473';
    
        const USER_ID = 'clarifai';
        const APP_ID = 'main';
        
        const MODEL_ID = 'moderation-multilingual-text-classification';
        const MODEL_VERSION_ID = '79c2248564b0465bb96265e0c239352b';
        const RAW_TEXT = req.body.comment;
        const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");
        
        const stub = ClarifaiStub.grpc();
        
        const metadata = new grpc.Metadata();
        metadata.set("authorization", "Key " + PAT);
        
    
       
       
       await stub.PostModelOutputs(
        {
            user_app_id: {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            model_id: MODEL_ID,
            version_id: MODEL_VERSION_ID, 
            inputs: [
                {
                    "data": {
                        "text": {
                            "raw": RAW_TEXT
    
                        }
                    }
                }
            ]
        },
        metadata,
        async (err, response) => {
            if (err) {
                throw new Error(err);
            }
    
            if (response.status.code !== 10000) {
                throw new Error("Post model outputs failed, status: " + response.status.description);
            }
    
            const output = response.outputs[0];
    
            console.log("Predicted concepts:");
            for (const concept of output.data.concepts) {
    
                // filter.set(concept.name,concept.value);
             filters[concept.name]=concept.value;
                console.log(concept.name + " " + concept.value);
           
            }
            if(filters['toxic']>0.75)
            return  res.status(200).json({"isposted":false});
            else
            {  // await comment.save();
                await Post.findOneAndUpdate({_id:req.body.post},{$push:{comments:comment}} );
                res.status(200).json({"isposted":true});
            }
         
           
        }
       
       
    );
        
    }catch(e)
    {
        return res.status(500).json({"mssg":e.message,"filters":filters});
    }

    //yhaha se real hai 
    // await comment.save();
});


postRouter.post("/api/do-like", async (req,res) =>{      
    try{
        const like = new Like({name:req.body.name});
    // await like.save();
   var liked=await Post.findOne({_id:req.body.post,"likes":{"$elemMatch":{name:req.body.name}}});
//    var status=liked.findOne({likes});
//    liked=await Post.findOne({_id:req.body.post,'$and':{likes:like}})
// console.log(status);
   if(liked==null)
{
    await Post.findOneAndUpdate({_id:req.body.post},{$push:{likes:like}} );
    return res.status(200).json({"mssg":"Post was Liked Successfully"});
}
else
{

  var xyz=  await Post.findOneAndUpdate({_id:req.body.post},{$pull:{"likes":{name:req.body.name}}});
  console.log(xyz);
return res.status(200).json({"mssg":"Post was Unliked Successfully"});
}}catch(e)
{
return res.status(500).json({"mssg":e.message});
}
    
}); 

postRouter.post("/api/deletePost/:id", async (req,res) =>{      
    // await comment.save();
try{
    x=  await Post.findOneAndDelete({_id:req.params.id});
    console.log(x);
    return res.status(200).json({"mssg":"Deleted Successfully"});
}
catch(e)
{
    return res.status(500).json({"mssg":e.message});
}

});

postRouter.post("/api/do-follow", async (req,res) =>{      
    try{
        const followby = {name:req.body.followByName,userID:req.body.followBy};
        const followto= {name:req.body.followToName,userID:req.body.followTo};

        // const {followBy,followTo}=req.body;

   var x=await User.findOne({_id:req.body.followTo,"followBy":{"$elemMatch":{userID:req.body.followBy}}});
   //,"followBy":{"$eleMatch":{followBy}}
//    var liked=await Post.findOne({_id:req.body.post,"likes":{"$elemMatch":{name:req.body.name}}});
// console.log(followby);
   if(x==null)
{
    await User.findOneAndUpdate({_id:req.body.followTo},{$push:{followBy:followby}});
    await User.findOneAndUpdate({_id:req.body.followBy},{$push:{followTo:followto}});
    return res.status(200).json({"mssg":"Followed Successfully"});
}
else
{
    await User.findOneAndUpdate({_id:req.body.followTo},{$unset:{followBy:followby}});
    await User.findOneAndUpdate({_id:req.body.followBy},{$unset:{followTo:followto}});
return res.status(200).json({"mssg":"Unfollowed Successfully"});
}}catch(e)
{
return res.status(500).json({"mssg":e.message});
}
    
}); 


module.exports=postRouter;

