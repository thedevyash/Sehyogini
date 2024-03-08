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
    authorID:{
require:true,
type:mongoose.Schema.Types.ObjectId
    },
    comments:
        {
            type:Array, ref:'Comment'
        },
    likes:{
        type:Array,
        require:false
    },
    images:{
        type:mongoose.Schema.Types.ObjectId,
        require:false
    }
    }
);





const Post=mongoose.model("Post",postSchema);

module.exports=Post;

