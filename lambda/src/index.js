import AWS from 'aws-sdk';
import {loadFromS3} from './config'
import {getSheetsJson} from './google'

let s3 = new AWS.S3();

export function handler(event, context, callback) {
  console.log("Initialising.")
  let config = loadFromS3()
  config.then((conf)=> {
    let sheetJson = getSheetsJson(conf.keyFile, conf.sheetId).then((response) => {
      let parsed = response.map(parseRows);
      let uploadParams = {
        Bucket: conf.uploadBucket,
        Key: "data.json",
        Body: JSON.stringify(parsed)
      };
      let upload = s3.putObject(uploadParams, function(err, data) {
        if (err) console.error("could not upload to s3", err);
        else console.log('successfully uploaded to s3')
        callback(null)
      })
    }).catch((error)=>{
      console.error("Failed to get credentials",error)
      callback(error)
    })
  })
}

function parseRows(row) {
  return {
    question: row.question,
    link: row.link,
    keywords: row.keywords.replace(/ /g, "").split(","),
    application: row.application
  };
}
