var express = require('express');
var router = express.Router();
const bodyParser=require('body-parser');
var connection  =  require('./config.js');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/users', function(req, res, next) {
  res.render('register');
});
router.post('/users',(req,res,next)=>{
  var values = [[req.body.name,req.body.email,req.body.password]];
  connection.query("INSERT INTO users(name,email,password) VALUES ?",[values],function(error,results,fields){
    if(error) {
      console.log(error.code);
      console.log(error.fatal);
      res.json({

          status:false,
          message:'there are some error with query'
      });
    }else{
      res.render('index');
    }
  })
 
});
router.get('/contact', function(req, res, next) {
  res.render('contact');
});
router.get('/dashboard', function(req, res, next) {
  if(loggedin==true)
  {
    res.render('dashboard',{"message":"Hi "+username+", Welcome to Juxtapose!"});
  }
  else{
    res.send("You have not logged in");
  }
});
router.get('/board', function(req, res, next) {
  if(loggedin==false){
    return res.send("You are not logged in.");
  }
  connection.query("SELECT * FROM list WHERE user_id=?",[user_id],function(error,results,fields){
    if(results.length>0){
      var list = [];
      for(i=0;i<results.length;i++)
      {
        list.push(results[i].list_name);
      }
      res.render('board1',{list_message:"Here are all the lists you made..",list:list,list1:[]});
    }
    else
    {
      res.render('board1',{list_message:"There is no list created yet!!",list:[],list1:[]});
    }
  })
});
router.post('/team', function(req, res, next) {
  if(loggedin==false){
    return res.send("You are not logged in.");
  }
  var details = [[user_id,req.body.Member1,(req.body.Member2||"null"),(req.body.Member3||"null"),(req.body.Member4||"null")]];
  console.log(details);
  connection.query("INSERT INTO teams(user_id,Member1,Member2,Member3,Member4) VALUES ?",[details],function(error,results,fields){
    if(error) {
      console.log(error.code);
      console.log(error.fatal);
      res.json({
          status:false,
          message:'there are some error with query'
      });
    }else{
      console.log("done");
      res.redirect('/team');
    }
  })
});
router.get('/team',function(req,res,next){
  if(loggedin==false){
    return res.send("You are not logged in.");
  }
  connection.query("SELECT * FROM teams WHERE user_id=?",[user_id],function(error,results,fields){
    if(results.length>0){
      var list = [];
      for(i=0;i<results.length;i++)
      {
        list.push(results[i].Member1,results[i].Member2,results[i].Member3,results[i].Member4);
      }
      console.log(list);
      res.render('teams',{list_message:"Here are all the teams you made..",list:list});
    }
    else
    {
      res.render('teams',{list_message:"There is no team made yet!!",list:[]});
    }
  })
});
router.get('/teamboard', function(req, res, next) {
  if(loggedin==false){
    return res.send("You are not logged in.");
  }
  connection.query("SELECT * FROM list WHERE user_id=?",[user_id],function(error,results,fields){
    if(results.length>0){
      var list = [];
      for(i=0;i<results.length;i++)
      {
        list.push(results[i].list_name);
      }
      res.render('teamboard',{list_message:"Here are all the lists you made..",list:list,list1:[]});
    }
    else
    {
      res.render('teamboard',{list_message:"There is no list created yet!!",list:[],list1:[]});
    }
  })
});
router.get('/logout', function(req, res, next) {
  if(loggedin==true)
  {
    loggedin=false;
    user_id=0;
    username="null";
    res.render('index');
  }
  else{
    res.send("You have not logged in");
  }
});
router.post('/list',function(req,res,next){
  if(loggedin==false){
    return res.send("You are not logged in.");
  }
  var list_name = req.body.name;
  var details = [[list_name,+user_id]];
  connection.query("INSERT INTO list(list_name,user_id) VALUES ?",[details],function(error,results,fields){
    if(error) {
      console.log(error.code);
      console.log(error.fatal);
      res.json({
          status:false,
          message:'there are some error with query'
      });
    }else{
      return res.send(list_name);
    }
  })
});
router.post('/card',function(req,res,next){
  if(loggedin==false){
    return res.send("You are not logged in.");
  }
  var details = [[req.body.name,req.body.description,req.body.due_date,req.body.attachment]];
  connection.query("INSERT INTO cards(name,description,due_date,attachment) VALUES ?",[details],function(error,results,fields){
    if(error) {
      console.log(error.code);
      console.log(error.fatal);
      res.json({
          status:false,
          message:'there are some error with query'
      });
    }else{
      console.log("done");
      return res.send(details);
    }
  })
});

router.all(('/showcards'),function(req,res,next){
  var list_name=req.body.list_name;
  var card_list=[list_name];
  var list=[];
  console.log(req.body.list_name);
  connection.query("SELECT * FROM list WHERE list_name=? AND user_id=?",[list_name,user_id],function(error,results,fields){
    if(results.length>0)
    {
      var list_id= results[0].list_id;
      for(i=0;i<results[0].length;i++)
      {
        list.push(results[i].list_name);
      }
      connection.query("SELECT * FROM newcards WHERE list_name=? AND list_id=?",[list_name,list_id],function(error1,results1,fields1){
        if(results1.length>0)
        {
          for(i=0;i<results1.length;i++)
          {
            card_list.push(results1[i].card_name);
          }
           res.send(card_list);
        }
      })
    }
  })
});
router.post('/newcard',function(req,res,next){
  var list_id = 0;
  var list_name= req.body.list_name;
  connection.query("SELECT * FROM list WHERE list_name=? AND user_id=?",[req.body.list_name,user_id],function(error,results,fields){
    if(results.length>0){
      list_id=results[0].list_id;
      console.log(list_id);
      var details = [[+list_id,req.body.list_name,req.body.card_name]];
      connection.query("INSERT INTO newcards(list_id,list_name,card_name) VALUES ?",[details],function(error,results,fields){
      if(error) {
        console.log(error.code);
        console.log(error.fatal);
        res.json({
           status:false,
           message:'there are some error with query'
        });
      }else{
        res.send(list_name);
      }
    })
  }
})
});
router.post(('/removecard'),function(req,res,next){
  var card_name=req.body.card_name;
  var list_name=req.body.list_name;
  var card_id=0;
  console.log(card_name);
  connection.query("SELECT * FROM newcards where card_name=? AND list_name=?",[card_name,list_name],function(error,results,fields){
    if(results.length>0)
    {
      card_id=results[0].card_id;
      console.log(card_id);
    connection.query('DELETE * FROM newcards where card_id=?',[card_id],function(error1,results1,fields1)
    {
      if(error1) {
        console.log(error1.code);
        console.log(error1.fatal);
        res.json({
           status:false,
           message:'there are some error with query'
        });
      }else{
      connection.query('DELETE * FROM cards where card_id=?',[card_id],function(error2,resukts2,fields2){

      })}
      })
    }
  })
});
module.exports = router;
