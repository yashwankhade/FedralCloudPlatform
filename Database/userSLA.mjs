import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    dataDescription: String,
    Security : String,
    StorageCapacity: String,
    Bandwith: String,
    CloudSLA:{
        type: String,
        default: "None"
    },
    CloudPrice:{
        type: Number,
        default: 0
    }
});

const USERSLA = new mongoose.model("u", userschema);

export default USERSLA;