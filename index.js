const express=require("express");
const mongoose = require("mongoose");
const http = require("http");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");

const PORT= process.env.PORT | 3001;
const app =express();
app.use(express.json());
app.use(authRouter);
app.use(postRouter);
var server =http.createServer(app);

server.listen(PORT,"0.0.0.0",()=>{
    console.log(`server running at ${PORT}`)
});

const DB="mongodb+srv://aloo:vNLpMxTBdm7Z6k6K@cluster0.ixkebsc.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DB).then(()=>{
    console.log("connection succesful");
 
}).catch((err)=>{
    console.log(err);
});
