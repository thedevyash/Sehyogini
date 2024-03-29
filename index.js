const express=require("express");
const mongoose = require("mongoose");
const http = require("http");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const jobsRouter = require("./routes/jobs");
const schemeRouter = require("./routes/schemes");
const workshopRouter = require("./routes/workshop");
const audioSentiRouter = require("./routes/audioSentiment");
const PORT= process.env.PORT | 3001;
const app =express();
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(express.json());
app.use(authRouter);
app.use(postRouter);
app.use(jobsRouter);
app.use(workshopRouter);
app.use(audioSentiRouter);
var server =http.createServer(app);
app.use(schemeRouter);
server.listen(PORT,"0.0.0.0",()=>{
    console.log(`server running at ${PORT}`)
});

const DB="mongodb+srv://aloo:vNLpMxTBdm7Z6k6K@cluster0.ixkebsc.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DB).then(()=>{
    console.log("connection succesful");
 
}).catch((err)=>{
    console.log(err);
});
