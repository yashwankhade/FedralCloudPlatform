import multer from "multer"
import express from "express";
import CLOUD from "./Database/cloudSLA.mjs";

const app = express.Router()

const upload = multer();

const uploadMultiple = upload.fields([
    {name : "security"},
    {name : "bandwidth"},
    {name : "storageCapacity"},
    {name : "cloudName"},
    {name : "price"},
    {name : "cloud"}
])

app.post("/addcloud", uploadMultiple, async(req, res) => {
    try {
        if(req.query.id != "meetoswal"){
            res.send("page not found").status(404)
        }
        const createCloudSLA = new CLOUD({
            security : req.body.security,
            bandwidth : req.body.bandwidth,
            storageCapacity : req.body.storageCapacity,
            cloudName : req.body.cloudName,
            price : req.body.price,
            cloud : req.body.cloud
        })

        const result = await createCloudSLA.save();
    
        res.send(result).status(200);
    } catch (error) {
        console.log(error);
        const response = {
            status : "Failure",
            error : error
        }

        res.send(response).status(400)
    }
})

export default app;