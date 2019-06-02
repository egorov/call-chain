describe('makeChain', () => {

  const makeChain = require('../src/makeChain');
  let array = null;
  let methods = null;

  beforeEach(() => {
    array = [];
    methods = [
      (container, callback) => {
        container.push('first');
        return callback(container);
      },
      (container, callback) => {
        container.push('second');
        return callback(container);
      },
      (container, callback) => {
        container.push('third');
        return callback(container);
      }
    ];
  });

  it('should call a sequence of functions', () => {

    const chain = makeChain(methods, array);

    chain();

    expect(array.length).toEqual(3);
    expect(array[0]).toEqual('first');
    expect(array[1]).toEqual('second');
    expect(array[2]).toEqual('third');
  });

  it('should interrupt chain execution', () => {

    const noCallback = (container) => container.push('interrupted');

    methods.splice(1, 0, noCallback);

    const chain = makeChain(methods, array);

    chain();

    expect(array.length).toEqual(2);
    expect(array[0]).toEqual('first');
    expect(array[1]).toEqual('interrupted');
  });

  it('should throw an error', () => {

    const error =
      new TypeError('"methods" argument must not empty be array of functions!');

    expect(() => makeChain([], array)).toThrow(error);
    expect(() => makeChain(null, array)).toThrow(error);
    expect(() => makeChain({}, array)).toThrow(error);
    expect(() => makeChain('array', array)).toThrow(error);
    expect(() => makeChain(['array'], array)).toThrow(error);
  });
});