describe('makeChain', () => {

  const makeChain = require('../src/makeChain');
  let array = null;
  const methods = [
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
    },
    () => {
      array.push('last');
    }
  ];

  beforeEach(() => {
    array = [];
  });

  it('should call a sequence of functions', () => {

    const chain = makeChain(methods, array);

    chain();

    expect(array.length).toEqual(4);
    expect(array[0]).toEqual('first');
    expect(array[1]).toEqual('second');
    expect(array[2]).toEqual('third');
    expect(array[3]).toEqual('last');
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