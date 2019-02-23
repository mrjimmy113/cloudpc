var express = require('express');
var app = express();
var path = require('path');

const dbAccount = require('./dbModules/dbAccountModule');

app.listen(process.env.PORT ||3000);
app.use(express.json())
app.use(express.static('static'));
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname+'/html/index.html'));
 });
 var movies = [
  {id: 101, name: "Fight Club", year: 1999, rating: 8.1},
  {id: 102, name: "Inception", year: 2010, rating: 8.7},
  {id: 103, name: "The Dark Knight", year: 2008, rating: 9},
  {id: 104, name: "12 Angry Men", year: 1957, rating: 8.9}
];

app.post("/login",function(req,res){
  dbAccount.login(req.body.username, req.body.password)
  .then(result => res.json(result))
  .catch(err => res.json('Error: ' + err));
  
});
