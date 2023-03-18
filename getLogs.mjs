import express from "express";
import LOG from "./Database/userLogCollection.mjs";

const app = express.Router();

app.get("/logs/:userId", async(req ,res) =>{

    try {
        const result = await LOG.findOne({userId : req.params.userId}).select({entries : 1, _id : 0});

    res.send(result).status(200);
    } catch (error) {
        res.send(error).status(200);
    }
})

export default app;
