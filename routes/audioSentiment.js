const express=require("express");
const audioSentiRouter=express.Router();
//index.js file

///////////////////////////////////////////////////////////////////////////////////
// In this section, we set the user authentication, app ID, workflow ID, and
// audio URL. Change these strings to run your own example.
///////////////////////////////////////////////////////////////////////////////////
audioSentiRouter.post("/api/audioSentiment",async(req,res)=>{

    const {audioURL}=req.body;
    let senti={};
    const USER_ID = 'clarifai';
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = 'f0926fb0e98942e6b5037257f571d473';
    const APP_ID = 'main';
    // Change these to make your own predictions
    const WORKFLOW_ID = "asr-sentiment";
    const AUDIO_URL = "https://samples.clarifai.com/negative_sentence_1.wav";
    
    /////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    /////////////////////////////////////////////////////////////////////////////
    
    const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");
    
    const stub = ClarifaiStub.grpc();

    const metadata = new grpc.Metadata();
    metadata.set("authorization", "Key " + PAT);
    
    try{
     await   stub.PostWorkflowResults(
            {
              user_app_id: {
                "user_id": USER_ID,
                "app_id": APP_ID,
              },
              workflow_id: WORKFLOW_ID,
              inputs: [{ data: { audio: { url: AUDIO_URL } } }],
            },
           await metadata,
            (err, response) => {
              if (err) {
                throw new Error(err);
              }
          
              if (response.status.code !== 10000) {
                throw new Error(
                  "Post workflow results failed, status: " + response.status.description
                );
              }
      
              const results = response.results[0];
       
              for (const output of results.outputs) {
                const model = output.model;
                console.log("Output for the model: `" + model.id + "`");        
            for (const concept of output.data.concepts){    
                  console.log("\t" + concept.name + " " + concept.value);
                  senti[concept.name]= concept.value;       
                }
                 
                if(output.data.text){
                console.log(output.data.text.raw); 
               
                }
                    
              }
              return res.status(200).json({"Mssg":"Success","sentiment":senti});
            }
          );

          
    }catch(e)
    {
        return res.status(500).json({"Mssg":"failed"});
    }
  
});




module.exports=audioSentiRouter;