import AWS from 'aws-sdk';
import {loadFromS3, googleCreds} from './config'
import repeat from 'lodash/repeat'
import 'whatwg-fetch';

export function handler(event, context, callback) {
  console.log("Initialising.")
  let creds = loadFromS3()
  creds.then((creds)=>{
    console.log(creds)
    let gCreds = googleCreds();
    console.log("CREDS = " + process.env.GOOGLE_APPLICATION_CREDENTIALS);
    console.log(repeat('hello',10))
    //callback(null)
  }).catch((error)=>{
    console.error("Failed to get credentials",error)
    callback(error)
  })

}

function getGoogleSheetsData() {
  let sheetId = '16yi_4-_JYd8CH-UyZ0cbWVtVUqA2DUgNoiqSUwt2FJc' //TODO: Move to config
  fetch('https://sheets.googleapis.com/v4/spreadsheets/values:batchGet?ranges=Sheet1' , { //TODO: Determine range
    method: 'GET'
  }).then(function(response) {
    if (response.status === 200) {

    }
  })
}
