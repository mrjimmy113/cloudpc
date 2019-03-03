var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
const fileUpload = require('express-fileupload');
const dbAccount = require('./dbModules/dbAccountModule');
const dbGear = require('./dbModules/dbGearModule');
const typeRoute = require('./routerModules/typeRouter');
const gearRoute = require('./routerModules/gearRouter');
app.listen(process.env.PORT ||3000);
app.use(express.json())
app.use(express.static('static'));
app.use(cors());
app.use(fileUpload());
app.use('/type',typeRoute);
app.use('/gear',gearRoute);
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname+'/html/index.html'));
 });

app.post("/login",function(req,res){
  console.log("Call API");
  dbAccount.login(req.body.username, req.body.password)
  .then(result => res.json(result))
  .catch(err => res.json('Error: ' + err));
  
});


