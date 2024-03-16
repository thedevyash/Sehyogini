const mongoose=require("mongoose");

const workshopSchema=mongoose.Schema({

    "organization"  : {
        type:String,
        require:true,
    },
    "location": {
        type:String,
        require:true,
    },
    "workshop_name" : {
        type:String,
        require:true,
    },
    "workshop_description" : {
        type:String,
        require:true,
    },
    "Date_time" : {
        type:String,
        require:true,
    },
    "venue": {
        type:String,
        require:true,
    },
    "icon" : {
        type:String,
        require:true,
    }
}

);



const Workshop= mongoose.model("Workshop",workshopSchema);

module.exports=Workshop;