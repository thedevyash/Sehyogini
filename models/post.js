const mongoose=require("mongoose");

const postSchema=(
    {
    title:{
        require:true,
        type:String
    },
    content:{
        type:String,
        require:true
    },
    author:{
        require:true,
        type:String
    },
    comments:
        {
            type:Array, ref:'Comment'
        },
    likes:{
        type:Array,
        require:false
    }
    }
);





const Post=mongoose.model("Post",postSchema);

module.exports=Post;

