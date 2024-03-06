const express=require("express");
const Job = require("../models/jobs");
const CategoryJobs=require('../models/categoryjobs');
const jobsRouter=express.Router();

jobsRouter.post('/api/createJob/:id',async(req,res)=>{
try{
    const {jobtitle,company,jobcategory,applications,description,details}=req.body;
    job= new Job({
        jobtitle,jobcategory,company,details,description,applications});
        console.log(jobcategory);
        // var x=jobcategory;
        if(jobcategory=="technology")
        await CategoryJobs.findOneAndUpdate({_id:req.params.id},{$push:{technology:job}} );
        else if(jobcategory=="freelance")
        await CategoryJobs.findOneAndUpdate({_id:req.params.id},{$push:{freelance:job}} );
        else if(jobcategory=="caregiving")
        await CategoryJobs.findOneAndUpdate({_id:req.params.id},{$push:{caregiving:job}} );
        else if(jobcategory=="philanthropy")
        await CategoryJobs.findOneAndUpdate({_id:req.params.id},{$push:{philanthropy:job}} );
        else if(jobcategory=="craftsmanship")
        await CategoryJobs.findOneAndUpdate({_id:req.params.id},{$push:{craftsmanship:job}} );
     

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
  )
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

module.exports=jobsRouter;