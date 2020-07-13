**DEPRECATION WARNING**
As of 13 July 2020, this project is deprecated and infrastructure torn down. This is because it is no longer used/needed.

# Editorial Tools Help

Static help site that lives at https://help.gutools.co.uk and can be embedded in Editorial Tools

# Components

- Lambda: This retrieves help links & info from a Google Sheet that can be used as a CMS, and places the data in an S3 Bucket
- Site: A static website on top of an S3 bucket, that sits behind CloudFront. https://help.gutools.co.uk

# Running

See the readme in the Lambda folder for details on running the lambda

To setup the static site locally:
1. `cd project`
2. `nvm use`
3. `npm install`

To run:
`npm run dev`

# Deployment

The project builds in TeamCity. Deployment of the Lambda is via RiffRaff

The static site files are synced with the S3 bucket automatically by TeamCity on merge to master, using the `team-city-static-s3-upload.sh` script
