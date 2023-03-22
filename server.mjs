import express from "express";
import mongoose from "mongoose";
import uploadFiles from "./uploadFiles.mjs";
import createUser from "./createUser.mjs";
import createUserSLA from  "./createSLA.mjs";
import createCloudSLA from "./createCloudSLA.mjs";
import selectCloud from "./selectCloud.mjs";
import findClouds from "./findCloud.mjs";
import login from "./login/login.mjs";
import getLogs from "./getLogs.mjs";
import reDeploy from "./reDeploy.mjs";
const PORT = 3000;

const app = express();

mongoose.connect("mongodb://0.0.0.0:27017/test",{
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(() => console.log("connection success...")).catch((err)=> console.log(err));

try {
    app.get("/", (req, res) => {
        res.send("Hello There").status(200)
    })

    app.use(uploadFiles);// api to upload file to middleware

    app.use(createUser); // api to create new user

    app.use(createUserSLA); // api to create new SLA

    app.use(createCloudSLA); // api to create / add new cloud sla to platform

    app.use(selectCloud); //api to select and finalize the cloud the user wants;

    app.use(findClouds); //cloud filtering;

    app.use(login);

    app.use(getLogs); //get User Logs

    app.use(reDeploy);
    
} catch (error) {
   console.log(error); 
}

app.listen(PORT);
console.log(`${PORT} is the PORT`);

