function makeChain(methods, ...args) {

  validateMethods(methods);

  const array = args[0];

  let caller = null;
  let last = methods[methods.length - 1].bind(null, array, () => 0);

  for(let index = methods.length - 2; index >= 0; index -= 1){

    caller = methods[index].bind(null, array, last);

    last = caller;
  }

  return caller;
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
module.exports = makeChain;