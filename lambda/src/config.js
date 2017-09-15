import AWS from 'aws-sdk'

let s3 = new AWS.S3();

export function loadFromS3() {
   let stage = process.env.Stage
   console.log("running in stage " + stage)
   return new Promise((resolve, reject) =>{
     s3.getObject({ Bucket: "guconf-flexible/editorial-tools-help", Key: "config.json" }, (err, creds) => {
       if(err){
         console.error("failed to retreive credentials", err)
         reject(err)
         return
       }
       let string = creds.Body.toString();
       let j = JSON.parse(string);
       resolve(j);
     })
   })
}
