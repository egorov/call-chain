describe('makeChain', () => {

  const array = [];
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
    }
  ];
  const makeChain = require('../src/makeChain');

  it('should return chain', () => {

    const chain = makeChain(methods, array);

    chain();

    expect(array[0]).toBeTruthy('first');
    expect(array[1]).toBeTruthy('second');
    expect(array[2]).toBeTruthy('third');
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