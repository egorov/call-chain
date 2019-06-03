function makeChain(methods, initial) {

  validateMethods(methods);

  let caller = null;
  let last = methods[methods.length - 1].bind(null, initial, () => 0);

  for(let index = methods.length - 2; index >= 0; index -= 1){

    caller = methods[index].bind(null, initial, last);

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