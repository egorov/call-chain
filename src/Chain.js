/* eslint no-invalid-this: "off" */

const EventEmitter = require('events');

const chainPrototype = {
  index: 0,
  methods: null,
  errors: [],
  data: [],
  start() {
    this.index = 0;
    const method = this.methods[this.index];
    const error = this.errors[this.index];
    const data = this.data[this.index];
    const callback = this.cb.bind(this);
    
    method(error, data, callback);    
  },
  cb(error, data) {
    this.index += 1;
    this.errors.push(error);
    this.data.push(data);
    this.emit('next', this.index);
  }
};

function Chain(methods, initial) {

  validateMethods(methods);

  const chain = Object.assign(new EventEmitter(), chainPrototype);

  chain.methods = methods;
  chain.errors.push(null);
  chain.data.push(initial);
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

function nextCallback(index){

  if(index >= this.methods.length)
    return;

  const method = this.methods[index];

  method(this.errors[index], this.data[index], this.cb.bind(this));
}

module.exports = Chain;