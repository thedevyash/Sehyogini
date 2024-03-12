const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
name:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true
},
profilePic:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true,
},
phone:{
    type:String,
    required:true,
},
dob:{
    type:String,
    required:true,
},
city:{
    type:String,
    required:true,
},
state:{
    type:String,
    required:true,
},
details:{
    type:Map,
    required:true
},
followBy:{
    type:Array,
    required:false
},
followTo:{
    type:Array,
    required:false
},
myposts:{
type:Array,
required:false
},
acctype:{
type:String,
required:true
},
jobsPosted:{
    type:Array,
required:false
},
jobsApplied:{
    type:Array,
required:false
}

});



const User= mongoose.model("User",userSchema);


//taki baki files mei bhi use kr paye
module.exports=User;