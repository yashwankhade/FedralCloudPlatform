import express from "express";
import CLOUD from "./Database/cloudSLA.mjs";
import USERSLA from "./Database/userSLA.mjs";

const app = express.Router();

app.get("/getclouds", async (req, res) => {
  try {
    const requirements = await USERSLA.findOne({ _id: req.query.slaid });

    const results = await CLOUD.find({
      security: { $gt: requirements.security - 1 },
      storageCapacity: { $gt: requirements.storageCapacity - 1 },
      bandwidth: { $gt: requirements.bandwidth - 1 },
    }).sort({ price: 1 });
    res.send(results).status(200);
  } catch (error) {
    console.log(error);
    res.send(error).status(400);
  }
});

export default app;
