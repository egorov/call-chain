# Functions call chain builder

How to use it?

    const makeChain = require('../src/makeChain');
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

    it('should return chain', () => {

      const chain = makeChain(methods, array);

      chain();

      expect(array[0]).toBeTruthy('first');
      expect(array[1]).toBeTruthy('second');
      expect(array[2]).toBeTruthy('third');
    });