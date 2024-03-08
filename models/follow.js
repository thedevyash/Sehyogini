const mongoose=require("mongoose");
var followSchema = new mongoose.Schema({
    followByName:{
        type:String,
        require:true
    },
    followToName:{
        type:String,
        require:true
    },
    
    followBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    followTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}
);

const Follow=mongoose.model("Follow",followSchema);
module.exports=Follow;