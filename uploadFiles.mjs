import multer from "multer";
import USERSLA from "./Database/userSLA.mjs";
import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var filename = "";
var mimetypevalue = ""

//multer defining local storage for data
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./data/");
  },

  filename: (req, file, cb) => {
    mimetypevalue = file.mimetype;
    console.log(mimetypevalue);
    var fileExtension = file.originalname.split(".");
    let x = Math.floor(Math.random() * 1000 + 1);
    filename = `${x}-${fileExtension[0]}`;
    cb(null, `${filename}.${fileExtension[1]}`);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.array("files"), async(req, res) => {

    try {
        res.send("uploaded").status(200)
    } catch (error) {
        console.log(error)
        res.send(error).status(200)
    }
})

export default app;