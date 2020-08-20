const EventEmitter = require('events');

function ChainPrototype() {
  this.index = 0;
}

function Chain(methods, initial) {

  validateMethods(methods);

  const chain = Object.assign(new EventEmitter(), new ChainPrototype());

  chain.methods = methods;
  chain.errors = new Array(methods.length).fill(null);
  chain.data = new Array(methods.length).fill(null);
  chain.data[0] = initial;
  chain.start = startPrototype.bind(chain);
  chain.cb = callbackPrototype.bind(chain);
  chain.on('next', nextCallback.bind(chain));

  return chain;
}

function validateMethods(value){
  'use strict';

  const error =
    new TypeError('"methods" argument must not empty be array of functions!');

  if(!Array.isArray(value))
    throw error;

  if(value.length === 0)
    throw error;

  for(let index = 0; index < value.length; index += 1){
    if(typeof value[index] !== 'function')
      throw error;
  }
}

function startPrototype() {
  this.index = 0;
  this.errors.fill(null);
  const method = this.methods[this.index];
  const error = this.errors[this.index];
  const data = this.data[this.index];
  const callback = this.cb.bind(this);
  
  method(error, data, callback);    
}

function callbackPrototype(error, data) {
  validateError(error);
  validateData(data);
  
  this.index += 1;
  this.errors[this.index] = error;
  this.data[this.index] = data;
  this.emit('next', this.index);
}

function validateError(value) {
  if(typeof value === 'undefined')
    throw new Error('error value is required!');
}

function validateData(value) {
  if(typeof value === 'undefined')
    throw new Error('data value is required!');
}

function nextCallback(index){

  if(index >= this.methods.length)
    return;

  const method = this.methods[index];

  method(this.errors[index], this.data[index], this.cb.bind(this));
}

module.exports = Chain;