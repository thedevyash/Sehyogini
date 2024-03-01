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
city:{
    type:String,
    required:true,
},
state:{
    type:String,
    required:true,
},

});



const User= mongoose.model("User",userSchema);


//taki baki files mei bhi use kr paye
module.exports=User;