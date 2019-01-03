const express = require("express");
const http = require('http');
var cors = require('cors');
var router = express.Router();
const socketIo = require('socket.io')
// Create Server for IO
const bodyParser = require('body-parser');
var cors = require('cors');
var multer = require('multer');
var path = require('path');
const mongoose = require('mongoose')
// Mongoose Promise
mongoose.Promise = global.Promise;
var app = express();
app.use(cors());
var Issue = require('./models/Issue')
mongoose.connect('mongodb://tester:tester123@ds157439.mlab.com:57439/photogenerator', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open',() => {
  console.log('Connection Established')
})



//create a cors middleware
app.use(function(req, res, next) {
  //set headers to allow cross origin request.
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  });


// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



var store = multer.diskStorage({
  destination:function(req,file,cb){
      cb(null, './uploads');
  },
  filename:function(req,file,cb){
      cb(null, Date.now()+'.'+'png');
  }
});


var upload = multer({storage:store}).single('file');

router.post('/upload', function(req,res,next){
  upload(req,res,function(err){
      if(err){
          return res.status(501).json({error:err});
      }
      console.log(req.file)

      let issue = new Issue(req.file)

       issue.save().then(issue => {

  res.send('Success')
  }).catch(err => {
    res.send('Failed')

  })
      //do all database record saving activity
  });
});


router.post('/download', function(req,res,next){
  console.log(req.body)
  const filepath = path.join(__dirname,'../server/uploads') +'/'+ req.body.filename;
  if(filepath)
  res.sendFile(filepath);
});



router.post('/getDownloadPath', function(req,res,next){
  console.log(req.body)
  const filepath = path.join(__dirname,'../server/uploads');
  console.log(filepath)
  if(filepath)
  res.send(filepath);
});


// Posts

router.get('/list', function (req, res,next) {
  Issue.find({}, function (err, data) {
 
      if(err){
        console.log(err)
      }else{
       // console.log(data)
        console.log('No Errors ',new Date())
        res.json(data);
      }
     
  });
});

router.route('/addFile').post((req,res)=> {
  console.log(req.body)
 // console.log(io)
  let issue = new Issue(req.body)
  issue.save().then(issue => {

  res.send('Success')
  }).catch(err => {
    res.send('Failed')
  })
  //res.end('Hello')
})



app.use('/', router);


app.listen(3000, () => console.log('Server Listening at 3000'))