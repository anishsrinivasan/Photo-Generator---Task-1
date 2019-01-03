import mongoose from 'mongoose';
import Issue from './models/Issue';
import users from './models/users';
const session = require('express-session')
import express from 'express';
import bodyParser from 'body-parser';
var cors = require('cors');
var router = express.Router();
mongoose.Promise = global.Promise;
var app = express();
// app.use(session)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/issues', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open',() => {
  console.log('Connection Established')
})

  router.get('/list', function (req, res,next) {
    Issue.find({}, function (err, data) {
   
        if(err){
          console.log(err)
        }else{
         // console.log(data)
          console.log('No Errors')
          res.json(data);
        }
       
    });
});

  router.route('/addlist').post((req,res)=> {
    console.log(req.body)
    let issue = new Issue(req.body)
    issue.save().then(issue => {
      res.sendStatus(200).json({'success':'true'})
    }).catch(err => {
      res.sendStatus(400).json({'success':'false'})

    })
    //res.end('Hello')
})

router.route('/delete').post((req,res)=> {
  console.log(req.body)
  let id = req.body.postId;

  Issue.deleteOne({_id:id}, function (err, data) {
   
    if(err){
      console.log(err)
    }else{
     console.log(data)
      console.log('Doc Deleted')
      res.json(data);
      
    }
   
});
})

router.route('/update').post((req,res)=> {
  console.log(req.body)
  let data = req.body;
  let id = req.body.postId;
var myquery = { _id: id };
var newvalues = { $set: { postTitle: data.postTitle,postContent:data.postContent } };
  Issue.updateOne(myquery,newvalues, function (err, data) {
    if(err){
      console.log(err)
    }else{
     console.log(data)
      console.log('Doc Updated')
      res.json(data);
      
    }
   
});
})


router.route('/post/data').post(async (req,res)=> {
  console.log('Gotcha')
  const {postId} = req.body;
  console.log("Post Id ",postId)
  const resp = await  Issue.findOne({_id:postId}, (data,err) => {
    if(data){
      console.log('Posts Found')
      res.json({
        success:true,
        message:'Posts Failed'
      })
    }else{
      console.log('Posts Not Found')
      res.json({
        success:false,
        message:'Posts Failed'
      })
    }
  })

  })

router.route('/api/login').post(async (req,res)=> {
const {email,password} = req.body;
console.log(email,password)
const resp =  users.findOne(email,password)
console.log(resp)
if(!resp){
  console.log('Users Not Found')
  res.json({
    success:false,
    message:'User Logged Failed'
  })

}else{
  console.log('User Found')
  res.json({
    success:true,
    message:'User Logged In'
  })
}
})

app.use('/', router);
app.listen(3000, () => console.log('Server Listening at 3000'))