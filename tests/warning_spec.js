describe('warning', () => {

  const method = require('./warning');
  let context = null;

  beforeEach(() => {
    context = {
      messages: [],
      rule: require('./warningRule')
    };  
  });

  it('should push warning to context messages', (done) => {

    method(null, context, () => {

      expect(context.messages.length).toEqual(1);
      expect(context.messages[0]).toEqual('Warning 0!');
      done();
    });
  });

  it('should not push to context messages', (done) => {

    method(new Error('Something goes wrong!'), context, () => {

      expect(context.messages.length).toEqual(0);
      done();
    });
  });
});