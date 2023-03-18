import express from "express";
import USERSLA from "./Database/userSLA.mjs";
import CLOUD from "./Database/cloudSLA.mjs";
const app = express.Router()

app.patch("/selectcloud", async(req, res) => {
    try {
        const cloud = await CLOUD.findOne({_id : req.query.cloudid});

        await USERSLA.updateOne({_id : req.query.slaid},{
            $set : {
                cloudSLA : cloud._id,
                cloudPrice : cloud.price
            }
        })

        res.send({status : "Success"}).status(200);

    } catch (error) {
        console.log(error);
        res.send(error).status(400);
    }
   
})

export default app;