const express=require("express");
const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require("../models/like");
const postRouter=express.Router();

postRouter.post('/api/createPost',async(req,res)=>{
const {title,author,content,comments,likes}=req.body;
try{
    post=new Post({
        author:author,
        content:content,
        title:title,
        comments:comments,
        likes:likes
    });
    post=await post.save();
    return res.status(200).json({"author":author,"postID":post._id});
}catch(e)
{
    return res.status(500).json({"mssg":e.message});
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
    // await comment.save();
    await Post.findOneAndUpdate({_id:req.body.post},{$push:{comments:comment}} );
    res.send("Comment was added successfully");
});


postRouter.post("/api/do-like", async (req,res) =>{      
    const like = new Like({name:req.body.name});
    // await like.save();
    await Post.findOneAndUpdate({_id:req.body.post},{$push:{likes:like}} );
    res.send("Like was added successfully");
}) 

module.exports=postRouter;

