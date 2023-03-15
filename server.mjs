import express from "express";
import mongoose from "mongoose";
import USERSLA from "./Database/userSLA.mjs";
import CLOUD from "./Database/cloudSLA.mjs";

const PORT = 3000;

const app = express();

mongoose.connect("mongodb://0.0.0.0:27017/test",{
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(() => console.log("connection success...")).catch((err)=> console.log(err));

try {
    const result = await new CLOUD({
        CloudName: "String",
        // dataDescription: "String",
        Security : "High",
        StorageCapacity: "High",
        Bandwith: "Low",
        Price: 100
    }).save();

    console.log(result);
} catch (error) {
   console.log(error); 
}

app.listen(PORT);
console.log(`${PORT} is the PORT`);

