
const aws = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const cors = require('cors');
const app = express();
app.use(cors());

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
  }),
  limits: { fileSize: 1000000000 }
}).array('upload',1);

app.post('/uploadVideo', function (request, response, next) {
		uploadVideo(request, response, function (error) {
    		if (error) {
      			console.log(error);
     			return response.json({message: error});
    		}
    		console.log('File uploaded successfully.');

    		response.json({message: "Success"});
  		});
});

const uploadAudio = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'vyden',
    acl: 'public-read',
    key: function (request, file, cb) {
      console.log(file);
      cb(null, "audios/" + file.originalname);
    }
  })
}).array('upload', 1);

app.post('/uploadAudio', function (request, response, next) {
  uploadAudio(request, response, function (error) {
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
  }),
  limits: { fileSize: 25000000 }
}).array('upload', 1);

app.post('/uploadModel' ,function (req, res) {
		uploadModel(req, res, function (error) {
    		if (error) {
      			console.log(error);
     			return res.json({message: error});
    		}
    		console.log('File uploaded successfully.');

    		res.json({message: "Success"});
  		});
});

const uploadSrt = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'vyden',
    acl: 'public-read',
    key: function (request, file, cb) {
      console.log(file);
      cb(null, "srts/" + file.originalname);
    }
  }),
  limits: { fileSize: 25000000 }
}).array('upload', 1);

app.post('/uploadSrt' ,function (req, res) {
		uploadSrt(req, res, function (error) {
    		if (error) {
      			console.log(error);
     			return res.json({message: error});
    		}
    		console.log('File uploaded successfully.');

    		res.json({message: "Success"});
  		});
});

app.listen(3001, function () {
  console.log('Server listening on port 3001.');
});
