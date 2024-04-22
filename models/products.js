const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
productName:{
    type:String,
    require:true,
},
seller:{
    type:mongoose.Schema.Types.ObjectId,
    require:true
},
productCategory:{
    type:String,
    require:true
},
stock:{
    type:String,
    require:false,
},
description:{
    type:String,
    require:true,
},
price:{
    type:String,
    require:true,
},
productImage: {
    type: String,
    required: false, // Change this to true if the image is required
  }
},
);



const Product= mongoose.model("Product",productSchema);

module.exports=Product;