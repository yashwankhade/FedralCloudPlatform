import IPFSDeploy from "./deployToIPFS.mjs";

const cloudNode = async(fileName, cloudName, cloud, fileExtension, slaId)=> {

    if(cloud === "IPFS"){

        if(cloudName === "IPFS_001"){
            const API = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDk0QWI4MzQ5NUMwZURmNTc2ZjdiQjc4OGJDMDc4NDUxNDY5NDMyZTIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MDk4NzM3NzQ3MSwibmFtZSI6IlJ5dGhtTkZUIn0.vunRDt0PqRMx_866IOH4uwT-zjgQoQ5G7HSpB8HCoo8";
            const result = await IPFSDeploy(fileName, fileExtension, API);
            return result
        }
    }
    if(cloud === "Amazon"){
        if(cloud === "AWS_001"){
            const bucketName = "abc";
            const region = "abc";
            const accessKeyId = "abc";
            const secretAccessKey = "abc";
            return await AmazonDeploy(bucketName, region, accessKeyId, secretAccessKey, fileExtension, fileName, slaId);
        }
    }
}

export default cloudNode;