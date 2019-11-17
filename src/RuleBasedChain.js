/* eslint no-invalid-this: "off" */

const EventEmitter = require('events');

function RuleBasedChainPrototype() {
  this.index = 0;
  this.rules = [];
  this.errors = [];
  this.data = null;
}

function RuleBasedChain(rules, initial) {

  validateRules(rules);

  const chain = 
    Object.assign(new EventEmitter(), new RuleBasedChainPrototype());

  chain.rules = rules;
  chain.errors.push(null);
  chain.data = initial;
  chain.start = startPrototype.bind(chain);
  chain.cb = callbackPrototype.bind(chain);
  chain.on('next', nextCallback.bind(chain));

  return chain;
}

function validateRules(value){
  'use strict';

  const error =
    new TypeError('"rules" argument must be not empty array of objects!');

  if(!Array.isArray(value))
    throw error;

  if(value.length === 0)
    throw error;

  for(let index = 0; index < value.length; index += 1){
    if(typeof value[index] !== 'object')
      throw error;
  }
}

function startPrototype() {
  this.index = 0;
  this.data.rule = this.rules[0];
  const method = this.data[this.data.rule.type];
  const callback = this.cb.bind(this);
  
  method(null, this.data, callback);    
}

function callbackPrototype(error, data) {
  validateError(error);
  validateData(data);
  
  this.index += 1;
  this.errors.push(error);
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

  if(index >= this.rules.length)
    return;

  this.data.rule = this.rules[index];
  const method = this.data[this.data.rule.type];

  method(this.errors[index], this.data, this.cb.bind(this));
}

module.exports = RuleBasedChain;