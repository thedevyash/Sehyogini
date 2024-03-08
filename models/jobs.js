const mongoose=require("mongoose");

const jobSchema=mongoose.Schema({
jobtitle:{
    type:String,
    require:true,
},
postedBy:{
    type:mongoose.Schema.Types.ObjectId,
    require:true
},
jobcategory:{
    type:String,
    require:true
},
applications:{
    type:Array,
    require:false,
},
description:{
    type:String,
    require:true,
},
details:{
    type:Map,
    require:true,
},

},
{
    timestamps:true
});



const Job= mongoose.model("Job",jobSchema);

module.exports=Job;