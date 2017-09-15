import AWS from 'aws-sdk';
import {loadFromS3} from './config'
import {getSheetsJson} from './google'

export function handler(event, context, callback) {
  console.log("Initialising.")
  let config = loadFromS3()
  config.then((conf)=> {
    let sheetJson = getSheetsJson(conf).then(function(response) {
      let parsed = response.map(parseRows);
      console.log('parsed = ', parsed);
    });
    // callback(null)
  }).catch((error)=>{
    console.error("Failed to get credentials",error)
    callback(error)
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
