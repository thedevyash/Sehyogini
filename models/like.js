const mongoose=require("mongoose");
var likeSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }

},{
    timestamps: true
    
}
)

const Like=mongoose.model("Like",likeSchema);
module.exports=Like;