var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

console.log('server started');

app.get('/', function (req, res) {
  res.render('index.ejs')
});

app.listen(3000);