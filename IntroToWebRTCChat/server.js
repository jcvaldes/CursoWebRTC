var express = require('express.io');
var app = express();
app.http().io();
var PORT = 3000;
console.log('server started on port' + PORT);
app.use(express.static(__dirname + '/client'));

app.get('/', function (req, res) {
  res.render('index.ejs')
});

app.io.route('ready', function (req) {
  req.io.join(req.data);
  app.io.room(req.data).broadcast('announce', {
    message: 'New server in the ' + req.data + ' room.'
  });
})


app.listen(PORT);