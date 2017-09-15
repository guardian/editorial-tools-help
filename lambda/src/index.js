import AWS from 'aws-sdk';
import {loadFromS3} from './config'
import {getSheetsJson} from './google'

export function handler(event, context, callback) {
  console.log("Initialising.")
  let config = loadFromS3()
  config.then((conf)=> {
    let sheetJson = getSheetsJson(conf).then(function(response) {
      console.log('sheets reponse:' + response);
    });
    // callback(null)
  }).catch((error)=>{
    console.error("Failed to get credentials",error)
    callback(error)
  })
}
