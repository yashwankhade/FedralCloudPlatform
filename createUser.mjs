import express from "express";
import multer from "multer"
import USER from "./Database/userCollection.mjs";

const app = express.Router();

const upload = multer();

const uploadMultiple = upload.fields([
    {name : "userName"},
    {name : "email"},
    {name : "password"}
])
app.post("/newuser", uploadMultiple, async(req, res) => {
    try {
        const user = new USER({
            userName : req.body.userName,
            userEmail : req.body.email,
        })
    
        user.hashPassword(req.body.password);
        const result = await user.save();

        res.send(result).status(200);
    } catch (error) {
        const response = {
            status: "Failure",
            error: error
        }

        res.send(response).status(400)
    }
})

export default app;