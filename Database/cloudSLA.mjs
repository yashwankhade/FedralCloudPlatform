import mongoose from "mongoose";

const cloudSchema = new mongoose.Schema({
    cloudName: String, //Name
    security : Number, //featuer
    storageCapacity: Number, //feature
    bandwidth: Number, //feature
    price: Number, //Priceing
})

const CLOUD = new mongoose.model("cloud", cloudSchema);

export default CLOUD;