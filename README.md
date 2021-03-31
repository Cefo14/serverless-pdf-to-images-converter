# Serverless PDF To Images Converter
This project is for convert PDF pages to images.
Currently has a configuration for downloading and uploading files to S3 (this can be extensible to other services in the ServiceFactory folder).

## Scripts

### Docker
If you have Docker installed you can run the script "start.sh" to run the development environment (or if you prefer you can do it manually).

### (NPM/YARN) Scripts
"start" runs the project locally (by default the entry point is the file index.local.ts)  
"compile" compiles the typescript project to javascript  
"build:lambda" generates a zip file with the necessary files to be uploaded to an Lambda   
"test" run the project tests in watch mode  

## Envars
AWS_ACCESS_KEY_ID="string"  
AWS_SECRET_ACCESS_KEY="string"  
AWS_BUCKET="string"  
AWS_KEY_OUTPUT="string" (optional)  
