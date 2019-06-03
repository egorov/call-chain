describe('chain', () => {

  const Chain = require('../src/Chain');
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

        process.nextTick(() => {
          return callback(null, value);
        });
      },
      (error, data, callback) => {
        if (error)
          return callback(error);

        const value = `${data} second`;

        result.push(value);

        process.nextTick(() => {
          return callback(null, value);
        });
      },
      (error, data, callback) => {
        if (error)
          return callback(error);

        const value = `${data} third`;

        result.push(value);

        process.nextTick(() => {
          return callback(null, value);
        });
      }
    ];
  });

  it('should call chain of functions', (done) => {

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
});