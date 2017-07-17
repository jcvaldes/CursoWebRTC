const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('client'))


app.get('/hola', function (req, res) {
  res.status(200).send('Hola');
})

var messages = [{
  id: 1,
  text: 'Bienvenido al chat privado',
  nickname: 'Bot - jcvaldes.com'
}];
// lanza el evento connection
io.on('connection', function (socket) {
  console.log('El node con IP ' + socket.handshake.address + ' se ha connectado...');
  
  //le emito a todos los clientes cuando se conectan
  socket.emit('messages', messages);
  
  socket.on('add-message', function (data) {
    messages.push(data);
    
    //emito a todos los clientes q estén conectados
    io.sockets.emit('messages', messages);
  })
  
});

server.listen(6677, function () {
  console.log('server connected on http://localhost:6677')
})