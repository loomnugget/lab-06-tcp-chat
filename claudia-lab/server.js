'use strict';

//node modules
const net = require('net'); //use to create TCP server
const EE = require('events');
//environment variables
const PORT = process.env.PORT || 3000;
var Client = require('./model/client.js');

//module constants
const pool = [];
const server = net.createServer();
const ee = new EE; //new instance of event emitter

//Sends message to all
ee.on('\\all', function(client, string){
  pool.forEach( client => {
    client.socket.write(`${client.nickname}: ` + string);
  });
});

//sets nickname
ee.on('\\nick', function(client, string){
  client.nickname = string.trim();
});

//direct message
ee.on('\\dm', function(client, string) {
  var dmNickName = string.toString().split(' ').shift(1).trim();
  var message = string.toString().split(' ').slice(1).join(' ');
  pool.forEach(client => {
    if (dmNickName === client.nickname) {
      client.socket.write(`${dmNickName}: ${message}`); //WRONG!
    }
  });
});

server.on('connection', function (socket){
  var client = new Client(socket); //new client instance
  pool.push(client); // every time somebody connects, push to the array

  socket.on('data', function(data) {
    const command =  data.toString().split(' ').shift().trim();
    //command cuts off the first word
    if (command.startsWith('\\')) {
      ee.emit(command, client, data.toString().split(' ').slice(1).join(' '));
      //data passed in cuts off the first item and returns the rest of them
      return; //escapes function
    }
  });

  socket.on('close', function(socket){
    for (var i = 0; i < pool.length; i++){
      if (socket.id === pool[i].id) {
        var index = pool.indexOf(socket);
        pool.splice(index, 1);
      }
    }
  });

  socket.on('error', function(client,err){
    console.error(err);
  });
});

server.listen(PORT, function() { //calls when it connects to the port
  console.log('server running on port', PORT);
});
