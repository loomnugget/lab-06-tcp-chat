// constructors always go in the model directory
'use strict';
const uuid = require('node-uuid'); // universally unique identifier

//module logic
const Client = module.exports = function(socket) {
  this.socket = socket; // keeps a reference to the original socket
  this.nickname = `user_${Math.random()}`; // generate random nickname
  this.id = uuid.v4(); //generates random number
};
