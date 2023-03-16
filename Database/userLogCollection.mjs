import mongoose from "mongoose";

const logSchema = mongoose.Schema({
    userId : String,
    entries : [{
        original: String,
        stored : String,
        date : {
            type : Date,
            default : Date.now()
        },
        slaId : String,
    }]
})

logSchema.index({original : "text"});

const LOG = mongoose.model("log", logSchema);

export default LOG;