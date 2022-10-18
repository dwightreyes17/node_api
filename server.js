var express = require('express');
var app = express();
var fs = require("fs");

var marvel = {
   "marvel4" : {
      "name" : "Thor",
      "password" : "password1",
      "location" : "Asgard",
      "id": 4
   },
}

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})
app.get('/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      var users = JSON.parse( data );
      var marvel = users["marvel" + req.params.id] 
      console.log( marvel );
      res.end( JSON.stringify(marvel));
   });
})

app.delete('/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      delete data["marvel" + req.params.id];
       
      console.log( data );
      res.end( JSON.stringify(data));
   });
})

app.post('/addUsers', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      data["marvel4"] = marvel["marvel4"];
      console.log( data );
      res.end( JSON.stringify(data));
   });
})
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://127.0.0.1:8081", host, port)
})