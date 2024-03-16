const express=require("express");
const workshopRouter=express.Router();
const mongoose = require("mongoose");
const Workshop = require("../models/workshop");


workshopRouter.get('/api/getWorkshop',async(req,res)=>{
    try{
        
       j=await Workshop.find({});

     return  res.status(200).json(j);
    }catch(e)
    {
        return res.status(500).json({"mssg":"failed"});
    }
    });
    module.exports=workshopRouter;