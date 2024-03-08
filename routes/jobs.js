const express=require("express");
const Job = require("../models/jobs");
const User=require("../models/user")
const mongoose = require("mongoose");
const CategoryJobs=require('../models/categoryjobs');
const jobsRouter=express.Router();

jobsRouter.post('/api/createJob/:id',async(req,res)=>{
try{
    const {jobtitle,postedBy,jobcategory,applications,description,details}=req.body;
    job= new Job({
        jobtitle,jobcategory,postedBy,details,description,applications});
        console.log(jobcategory);
        // var x=jobcategory;
        if(jobcategory=="technology")
       {
        await CategoryJobs.findOneAndUpdate({_id:req.params.id},{$push:{technology:job}} );
        await User.findOneAndUpdate({_id:postedBy},{$push:{jobsPosted:job}});
      }
        else if(jobcategory=="freelance")
        {
          await CategoryJobs.findOneAndUpdate({_id:req.params.id},{$push:{freelance:job}} );
        await User.findOneAndUpdate({_id:req.body.postedBy},{$push:{jobsPosted:job}});
        }
        else if(jobcategory=="caregiving")
{
  await CategoryJobs.findOneAndUpdate({_id:req.params.id},{$push:{caregiving:job}} );
  await User.findOneAndUpdate({_id:req.body.postedBy},{$push:{jobsPosted:job}});
}
        else if(jobcategory=="philanthropy")
{
  await CategoryJobs.findOneAndUpdate({_id:req.params.id},{$push:{philanthropy:job}} );
  await User.findOneAndUpdate({_id:req.body.postedBy},{$push:{jobsPosted:job}});
}
        else if(jobcategory=="craftsmanship")
     {
      await CategoryJobs.findOneAndUpdate({_id:req.params.id},{$push:{craftsmanship:job}} );
      await User.findOneAndUpdate({_id:req.body.postedBy},{$push:{jobsPosted:job}});
     }
     

        return res.status(200).json({"mssg":"Job Posted Successfully","id":job._id});
}catch(e){
return res.status(500).json({"mssg":e.message});
}
});

jobsRouter.get('/api/getJobs/:id',async(req,res)=>{
try{
    
   j=await CategoryJobs.find({_id:req.params.id});
 return  res.status(200).json(j[0]);
}catch(e)
{
    return res.status(500).json({"mssg":"failed"});
}
});

jobsRouter.post('/api/applyJob/:id&:jobID',async(req,res)=>{
try{
    const {id,jobcategory}=req.body;
    const jobapplied={jobID:req.params.jobID,jobCategory:jobcategory};
// j=await CategoryJobs.find({_id:req.params.id});
if(jobcategory=="technology")
// console.log(j[0]['technology']);
//,'$and':[{'technology._id':jobID}]
// await j[0]['technology'].find({_id:jobID},{$push:{applications:id}});
// x=await CategoryJobs[0][technology].findOneAndUpdate({_id:req.params.jobID},{$push:{applications:id}});
await CategoryJobs.findOneAndUpdate(
    {
      _id: req.params.id,
      "technology": { "$elemMatch": { _id: req.params.jobID}}
    },
    { "$push": { "technology.$.applications": id }} 
  );
  await User.findOneAndUpdate({_id:id},{$push:{jobsApplied:jobapplied}});
  if(jobcategory=="freelance")
  await CategoryJobs.findOneAndUpdate(
    {
      _id: req.params.id,
      "freelance": { "$elemMatch": { _id: req.params.jobID}}
    },
    { "$push": { "freelance.$.applications": id }} 
  )
  if(jobcategory=="caregiving")
  await CategoryJobs.findOneAndUpdate(
    {
      _id: req.params.id,
      "caregiving": { "$elemMatch": { _id: req.params.jobID}}
    },
    { "$push": { "caregiving.$.applications": id }} 
  )
  if(jobcategory=="philanthropy")
  await CategoryJobs.findOneAndUpdate(
    {
      _id: req.params.id,
      "philanthropy": { "$elemMatch": { _id: req.params.jobID}}
    },
    { "$push": { "philanthropy.$.applications": id }} 
  )
  if(jobcategory=="craftsmanship")
  await CategoryJobs.findOneAndUpdate(
    {
      _id: req.params.id,
      "craftsmanship": { "$elemMatch": { _id: req.params.jobID}}
    },
    { "$push": { "craftsmanship.$.applications": id }} 
  )
return  res.status(200).json({"mssg":"Applied Successfully!"});
}catch(e)
{
    return res.status(500).json({"mssg":e.message});
}
});


jobsRouter.get('/api/getJobByID/:id&:jobID',async(req,res)=>{
try{
  const {jobcategory}=req.body.jobCategory;
  var x="";
  if(req.body.jobCategory=="technology")
 x= await CategoryJobs.find(
      {
        _id: req.params.id,
        "technology": { "$elemMatch": { _id: req.params.jobID}}
      }
    );
    if(req.body.jobCategory=="freelance")
   x= await CategoryJobs.find(
      {
        _id: req.params.id,
        "freelance": { "$elemMatch": { _id: req.params.jobID}}
      }
    );
    if(req.body.jobCategory=="caregiving")
  x=  await CategoryJobs.find(
      {
        _id: req.params.id,
        "caregiving": { "$elemMatch": { _id: req.params.jobID}}
      }
    );
    if(req.body.jobCategory=="philanthropy")
  x=  await CategoryJobs.find(
      {
        _id: req.params.id,
        "philanthropy": { "$elemMatch": { _id: req.params.jobID}}
      }
     
    );
    if(req.body.jobCategory=="craftsmanship")
 x=  await CategoryJobs.findOne({
  _id: req.params.id,
  "craftsmanship._id":"65e800e749ee425b58e7ba7c"
});
    console.log(x);
    return res.status(200).json({"job":x});
}catch(e)
{
  return res.status(500).json({"mssg":e.message});
}
});

module.exports=jobsRouter;