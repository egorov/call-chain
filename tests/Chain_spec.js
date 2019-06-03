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

        return callback(null, value);
      },
      (error, data, callback) => {
        if (error)
          return callback(error);

        const value = `${data} second`;

        result.push(value);

        return callback(null, value);
      },
      (error, data, callback) => {
        if (error)
          return callback(error);

        const value = `${data} third`;

        result.push(value);

        return callback(null, value);
      }
    ];
  });

  it('should pass', () => {

    const chain = new Chain(methods, 'Count...');

    chain.start();

    expect(result.length).toEqual(3);
    expect(result[0]).toEqual('Count... first');
    expect(result[1]).toEqual('Count... first second');
    expect(result[2]).toEqual('Count... first second third');
  });
});