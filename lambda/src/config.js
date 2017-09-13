import AWS from 'aws-sdk'

let fs = require('fs');
let google = require('googleapis');
let s3 = new AWS.S3();

export function loadFromS3() {
   let stage = process.env.Stage
   console.log("running in stage " + stage)
   return new Promise((resolve, reject) =>{
     s3.getObject({ Bucket: "guconf-flexible/editorial-tools-help", Key: "test.json" }, (err, creds) => {
         if(err){
             console.error("failed to retreive credentials", err)
             reject(err)
             return
         }
         let string = creds.Body.toString();
         let j = JSON.parse(string);
         console.log(j);
         resolve(j);
    })
})

}

export function googleCreds() {
  let fileName = 'g-keys.json'
  new Promise((resolve, reject) =>{
  let data = s3.getObject({ Bucket: "guconf-flexible/editorial-tools-help", Key: fileName })
  let credsFile = fs.createWriteStream("/tmp/" + fileName);
  data.createReadStream().pipe(credsFile);
  resolve("downloaded Google credentials");
  let readCreds = fs.readFile("/tmp/" + fileName, (err, data) => {
    console.log(err);
    console.log(data);
    })
  });

  process.env.GOOGLE_APPLICATION_CREDENTIALS = "/tmp/" + fileName;

  google.auth.getApplicationDefault(function(err, authClient) {
      if (err) {
          console.log(err);
      }});
}
