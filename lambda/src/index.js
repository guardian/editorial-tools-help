import AWS from 'aws-sdk';
import {loadFromS3} from './config'
import {getSheetsJson} from './google'

let GoogleSpreadsheet = require('google-spreadsheet');

export function handler(event, context, callback) {
  console.log("Initialising.")
  let config = loadFromS3()
  config.then((config)=> {
    let sheetJson = getSheetsJson().then(function(response) {
      console.log(response);
    });
    // callback(null)
  }).catch((error)=>{
    console.error("Failed to get credentials",error)
    callback(error)
  })
}
