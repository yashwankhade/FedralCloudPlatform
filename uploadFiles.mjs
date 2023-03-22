import multer from "multer";
import USERSLA from "./Database/userSLA.mjs";
import CLOUD from "./Database/cloudSLA.mjs";
import LOG from "./Database/userLogCollection.mjs";
import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import cloudNode from "./cloudNode.mjs";

const app = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var filename = "";
var mimetypevalue = ""
var fileExtension = "";
var fileNameArray = [];
var fileExtentionArray = [];
//multer defining local storage for data
const storage = multer.diskStorage({
  destination: async(req, file, cb) => {
    cb(null, `./data/`);
  },

  filename: (req, file, cb) => {
    mimetypevalue = file.mimetype.split("/");
    fileExtension = file.originalname.split(".");
    fileExtentionArray.push(fileExtension);
    let x = Math.floor(Math.random() * 10000 + 1);
    filename = `${x}_${fileExtension[0]}_${mimetypevalue[0]}_${mimetypevalue[1]}`;
    fileNameArray.push(filename);
    cb(null, `${filename}.${fileExtension[1]}`);
  },
});

const upload = multer({ storage: storage });

app.post("/upload/:slaId",upload.array("files"), async(req, res) => {
  
    try {
        const result = await USERSLA.findOne({_id : req.params.slaId});
        const cloud = await CLOUD.findOne({_id : result.cloudSLA});
        for(let i = 0; i < fileNameArray.length; i++){
        const cloudLink = await cloudNode(fileNameArray[i], cloud.cloudName, cloud.cloud, fileExtentionArray[i][1], req.params.slaId);
        const metadata = {
          original: fileExtentionArray[i][0],
          stored : cloudLink,
          slaId : req.params.slaId
        }
        await LOG.updateOne({userId : result.userId},{
          $push : {
            entries : metadata
          }
        })

        await USERSLA.updateOne({_id : result._id},{
          $inc : {
            itemsStored : 1
          }
        })
        }
        
        fileNameArray = [];
        fileExtentionArray = [];

        res.send({asn2: "Success"}).status(200)
    } catch (error) {
        console.log(error)
        res.send(error).status(200)
    }
})

export default app;