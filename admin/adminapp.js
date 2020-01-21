const express = require('express');
const adminapp = express();
const path = require('path');

var db;
const connection = require(path.join(__dirname, "dbconnect"))().then((client)=>{
  db = client.db;
});

const { Validator } = require('node-input-validator');
adminapp.set("views", path.join(__dirname, "views"));
adminapp.set("view engine", "pug");
adminapp.locals.title = 'Scooti Admin';
adminapp.use(express.urlencoded({ extended: true }));
adminapp.use(express.static(path.join(__dirname, 'public')))
const adminrouter = express.Router();
adminrouter.get('/', function (req, res, next) {
	//res.send('admin index page');
	res.render("login", { title: "Login",appdata:adminapp.locals });
});
adminrouter.post('/', function (req, res) {
	const v = new Validator(req.body, {
    	email: 'required|email',
    	password: 'required'
  	});
 
  	v.check().then((matched) => {
    	if (!matched) {
      		res.render("login", { title: "Login",appdata:adminapp.locals,postdata:req.body, errors:v.errors });
    	}else{
        var md5 = require('md5');
        var $match = {
          user_type:'A',
          email:req.body.email,
          password:md5(req.body.password)
        };
        db.collection("people").findOne($match,(err,resl)=>{
          if(err){
            res.render("login", { title: "Login",appdata:adminapp.locals,postdata:req.body,errors:{email:'Invalid input'} });
          }else if(resl.length>0){
            
          }else{
            res.render("login", { title: "Login",appdata:adminapp.locals,postdata:req.body,errors:{email:'Invalid usename and password'} });
          }
          console.log(err);
          console.log(resl);
        })
        /*MongoClient.open((err,client)=>{
          client.db("passengers").find({_id:1},(err,res)=>{
            console.log(err);
            console.log(res);
          })

        })*/
    		res.render("login", { title: "Login",appdata:adminapp.locals,postdata:req.body });
    	}
  	});

	//res.render("login", { title: "Login",appdata:adminapp.locals });
});
adminapp.use(adminrouter);

module.exports = adminapp;