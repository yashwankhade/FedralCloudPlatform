import fs from "fs";
import S3 from "aws-sdk/clients/s3.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


async function storeToAWS(bucketName, region, accessKeyId, secretAccessKey, fileName, fileExtension, slaId){

    let fileName = fileName;
    let fileExtension = fileExtension;
    let fileType = fileName.split("_");
    const s3 = new S3({
        region,
        accessKeyId,
        secretAccessKey
    });

    const data = fs.readFileSync(`${__dirname}\\data\\${fileName}.${fileExtension}`);

    const upload = await s3.upload({
        Bucket : bucketName,
        Body : data,
        Key : `${slaId}/${fileName}.${fileExtension}`,
        ContentType : `${fileType[2]}/${fileType[3]}`
    }).promise();

    return upload;
}

export default storeToAWS;