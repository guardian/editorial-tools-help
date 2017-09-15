import AWS from 'aws-sdk'

let fs = require('fs');
let GoogleSpreadsheet = require('google-spreadsheet');
let s3 = new AWS.S3();

export function getSheetsJson(config){
  //TODO: Make config values work
  const keysFileName = config.keyFile;
  const doc = new GoogleSpreadsheet(config.sheetId);
  const keysFilePath = "/tmp/" + keysFileName;

  return new Promise((resolve, reject) =>{
    downloadGoogleCreds()
      .then(saveCredsFile)
      .then(configureGoogleSdkKeys)
      .then(getSheetsRowsJson)
      .then(function(rows) {
        return resolve(rows);
      })
    });

    function downloadGoogleCreds() {
      const params = { Bucket: "guconf-flexible/editorial-tools-help", Key: keysFileName };
      console.log("In creds function");
      return new Promise((resolve, reject) =>{
        s3.getObject(params, function(err, response) {
          if (err) {
            console.error("failed to retreive google credentials", err);
            reject(err);
            return;
          }
          return resolve(response.Body.toString());
        });
      });
    }

    function saveCredsFile(response) {
      console.log("saving creds file");
      return new Promise((resolve, reject) =>{
        fs.writeFile(keysFilePath, response, function(err) {
          if (err) {
            console.error("could not save keys file", err)
            reject(err);
            return;
          }
          return resolve();
        });
      });
    }

    function configureGoogleSdkKeys() {
      console.log("applying google keys");
      const creds = require(keysFilePath);
      return new Promise((resolve, reject) =>{
        doc.useServiceAccountAuth(creds, function(err) {
          if (err) {
            console.error("could not apply key to google sdk", err);
            reject(err);
            return;
          }
          return resolve();
        });
      });
    }

    function getSheetsRowsJson() {
      console.log("downloading sheet json");
      return new Promise((resolve, reject) =>{
        doc.getRows(1, function(err, rows) {
          if (err) {
            console.error("could not retrieve sheet rows", err);
            reject(err);
            return;
          }
          console.log('sheet rows retrieved');
          console.log(rows);
          return resolve(rows);
        });
      });
    }
}
