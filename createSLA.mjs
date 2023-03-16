import multer from "multer"
import express from "express";
import USERSLA from "./Database/userSLA.mjs";

const app = express.Router()

const upload = multer();

const uploadMultiple = upload.fields([
    {name : "security"},
    {name : "bandwidth"},
    {name : "storageCapacity"},
    {name : "dataDescription"}
])

app.post("/sla/:userId", uploadMultiple, async(req, res) => {
    try {
        const createUserSLA = new USERSLA({
            security : req.body.security,
            bandwidth : req.body.bandwidth,
            storageCapacity : req.body.storageCapacity,
            dataDescription : req.body.dataDescription,
            userId : req.params.userId
        })

        const result = await createUserSLA.save();
    
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