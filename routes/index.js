
var express = require('express')
  , router = express.Router();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var gulp = require('gulp');
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', function(req,res,next){
	// console.log(req.body);
	// create an incoming form object

  
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;
  form.maxFieldsSize = 2 * 300 * 300;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '../public/images');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    // console.log(file);
    fs.rename(file.path, path.join(form.uploadDir, file.name), function(){

    });
  });


  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req, function(err, fields, files) {
  	// console.log(fields);
  	// console.log(files.image.name);


  imagemin(['../public/images/user-group-512.png'], '../public', {
    	plugins: [
        	imageminPngquant({quality: '0-100'})
    	]
	}).then(function (files) {
      console.log(files);
      console.log('helllo');
  });




});

});


// function printReq(req) {
// 	console.log(req.body);
// }
module.exports = router;
