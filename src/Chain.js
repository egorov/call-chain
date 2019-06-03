const EventEmitter = require('events');

const chainPrototype = {
  index: 0,
  methods: null,
  errors: [],
  data: [],
  start() {
    const method = this.methods[0];
    const error = this.errors[0];
    const data = this.data[0];
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
  const chain = Object.assign(new EventEmitter(), chainPrototype);

  chain.methods = methods;
  chain.errors.push(null);
  chain.data.push(initial);
  chain.on('next', NextCallback.bind(chain));

  return chain;
}

function NextCallback(index){

  if(index >= this.methods.length)
    return;

  const method = this.methods[index];

  method(this.errors[index], this.data[index], this.cb.bind(this));
}

module.exports = Chain;