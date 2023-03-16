import mongoose from "mongoose";


const userschema = new mongoose.Schema({
    dataDescription: String, //feature
    security : Number, //feature
    storageCapacity: Number, //feature
    bandwidth: Number, //feature
    itemsStored : Number, //items number
    userId : String, //userId
    bcryptSLAId : String,
    cloudSLA:{ //Cloud SLA Id
        type: String,
        default: "None"
    },
    cloudPrice:{ //Cloud Price
        type: Number,
        default: 0
    }

});

const USERSLA = new mongoose.model("userSLA", userschema);

export default USERSLA;