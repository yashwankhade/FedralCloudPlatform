import express from "express";
import multer from "multer";
import bcrypt from "bcryptjs";
import USER from "../Database/userCollection.mjs";

const app = express.Router()

const upload = multer();

const uploadMultiple = upload.fields([
    {name : "email"},
    {name : "password"},
])

app.post("/", uploadMultiple, async(req, res) => {
    try{

        const userlogin = await USER.findOne({email : req.body.email});

        const isMatch = await bcrypt.compare(req.body.password, userlogin.password);

        if(isMatch){
            res.send({status : "Success", data: userlogin}).status(200);
        }
        else{
            return res.status(201).send("Incorrect UserName or Password")
        }
    }catch(err){
       return res.status(400).send("Invalid Login Detalis");
    }
})

export default app;