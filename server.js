
const aws = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const cors = require('cors');
const app = express();
app.use(cors());
// Set S3 endpoint to DigitalOcean Spaces
//const spacesEndpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com');

const spacesEndpoint = new aws.Endpoint('http://s3-us-east-2.amazonaws.com/vyden');

const s3 = new aws.S3({
  endpoint: spacesEndpoint
});

const uploadVideo = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'vyden',
    acl: 'public-read',
    key: function (request, file, cb) {
      console.log(file);
      cb(null, "videos/" + file.originalname);
    }
  })
}).array('upload', 1);

app.post('/uploadVideo', function (request, response, next) {
  uploadVideo(request, response, function (error) {
    if (error) {
      console.log(error);
      return response.json({message: error});
    }
    console.log('File uploaded successfully.');
    response.json({message: "success"});
  });
});


const uploadModel = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'vyden',
    acl: 'public-read',
    key: function (request, file, cb) {
      console.log(file);
      cb(null, "models/" + file.originalname);
    }
  })
}).array('upload', 1);

app.post('/uploadModel', function (request, response, next) {
  uploadModel(request, response, function (error) {
    if (error) {
      console.log(error);
      return response.json({message: error});
    }
    console.log('File uploaded successfully.');
    response.json({message: "success"});
  });
});



app.get('/', function (request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

app.get("/success", function (request, response) {
  response.sendFile(__dirname + '/public/success.html');
});

app.get("/error", function (request, response) {
  response.sendFile(__dirname + '/public/error.html');
});

app.listen(3001, function () {
  console.log('Server listening on port 3001.');
});
