const mongoose=require("mongoose");


const categoryJobs=mongoose.Schema({
    technology:{
        type:Array,
        require:false
    },
    freelance:{
        type:Array,
        require:false
    },
    caregiving:{
        type:Array,
        require:false
    },
    philanthropy:{
        type:Array,
        require:false
    },
    craftsmanship:{
        type:Array,
        require:false
    },
});


const CategoryJobs=mongoose.model("CategoryJobs",categoryJobs);
module.exports=CategoryJobs;