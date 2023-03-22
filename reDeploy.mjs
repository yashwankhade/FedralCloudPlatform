import LOG from "./Database/userLogCollection.mjs";
import USERSLA from "./Database/userSLA.mjs";
import CLOUD from "./Database/cloudSLA.mjs";
import express from "express";

const app = express.Router();

app.patch("/redeploy/:slaId", async(req, res) => {

    const sla = await USERSLA.findOne({_id : req.params.slaId});
    const cloud = await CLOUD.findOne({_id : sla.cloudSLA});
    const log = await LOG.findOne({userId : sla.userId}).where({"entries.slaId" : req.params.slaId});

    console.log(log);
})

export default app;