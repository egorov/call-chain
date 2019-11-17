describe('alert', () => {

  const method = require('./alert');
  let context = null;

  beforeEach(() => {
    context = {
      messages: [],
      rule: require('./alertRule')
    };  
  });

  it('should push alert to context messages', (done) => {

    method(null, context, () => {

      expect(context.messages.length).toEqual(1);
      expect(context.messages[0]).toEqual('Alert 0!');
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