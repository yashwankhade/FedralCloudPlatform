import mongoose from "mongoose";

const cloudSchema = new mongoose.Schema({
    CloudName: String,
    Security : String,
    StorageCapacity: String,
    Bandwith: String,
    Price: Number,
})

const CLOUD = new mongoose.model("cloud", cloudSchema);

export default CLOUD;