const express=require("express");
const schemeRouter=express.Router();
const mongoose = require("mongoose");
const Scheme = require("../models/schemes");


schemeRouter.get('/api/getSchemes',async(req,res)=>{
    try{
        
       j=await Scheme.find({});

     return  res.status(200).json(j);
    }catch(e)
    {
        return res.status(500).json({"mssg":"failed"});
    }
    });
    module.exports=schemeRouter;