describe('Chain', () => {

  const Chain = require('../src/Chain');
  const methodsValidationError =
    new TypeError('"methods" argument must not empty be array of functions!');
  let result = null;
  let methods = null;

  beforeEach(() => {
    result = [];
    methods = [
      (error, data, callback) => {
        if (error)
          return callback(error);

        const value = `${data} first`;

        result.push(value);

        return process.nextTick(() => callback(null, value));
      },
      (error, data, callback) => {
        if (error)
          return callback(error);

        const value = `${data} second`;

        result.push(value);

        return process.nextTick(() => callback(null, value));
      },
      (error, data, callback) => {
        if (error)
          return callback(error);

        const value = `${data} third`;

        result.push(value);

        return process.nextTick(() => callback(null, value));
      }
    ];
  });

  it('should execute functions in array', (done) => {

    function checkResult() {      
      expect(result.length).toEqual(3);
      expect(result[0]).toEqual('Count... first');
      expect(result[1]).toEqual('Count... first second');
      expect(result[2]).toEqual('Count... first second third');  
      done();
    }

    methods.push(checkResult);

    const chain = new Chain(methods, 'Count...');

    chain.start();
  });

  it('should interrupt executions on sync function', (done) => {

    setTimeout(() => {
      expect(result.length).toEqual(2);
      expect(result[0]).toEqual('Count... first');
      expect(result[1]).toEqual('interrupted!');
      done();
    }, 100);

    methods.splice(1, 0, () => result.push('interrupted!'));
    const chain = new Chain(methods, 'Count...');

    chain.start();
  });

  it('should throw if methods is not array', () => {

    expect(() => new Chain(null, "Count")).toThrow(methodsValidationError);
  });

  it('should throw if methods array is empty', () => {

    expect(() => new Chain([], "Count")).toThrow(methodsValidationError);
  });

  it('should throw if methods array contains non function', () => {
    const wrong = [
      () => console.log('hello'),
      1
    ];

    expect(() => new Chain(wrong, "Count")).toThrow(methodsValidationError);
  });
});