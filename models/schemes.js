const mongoose=require("mongoose");

const schemeSchema=mongoose.Schema({
    "scheme_name" : {
        type:String,
        require:true,
    },
    "scheme_desription" : {
        type:String,
        require:true,
    },
    "url" : {
        type:String,
        require:true,
    },
    "benefits" : {
        type:String,
        require:true,
    },
    
    "icon":{
        type:String,
        require:true,
    },
    "ministry_name" :{
        type:String,
        require:true,
    },

}

);



const Scheme= mongoose.model("Schemes",schemeSchema);

module.exports=Scheme;