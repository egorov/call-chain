describe('Rule based chain', () => {

  const Chain = require('../src/RuleBasedChain');
  const ctx = {
    alert: require('./alert'),
    warning: require('./warning'),
    messages: []
  };
  const alert = require('./alertRule');
  const warning = require('./warningRule');
  let rules = null;

  beforeEach(() => {
    rules = [
      alert,
      warning,
      alert,
      warning
    ];  
  });

  it('should deal with rules methods', (done) => {

    ctx.end = done;

    ctx.check = (error, context, callback) => {
      
      expect(context.rule).toEqual({type: 'check'});
      expect(error).toBeNull();

      expect(context.messages[0]).toEqual('Alert 0!');
      expect(context.messages[1]).toEqual('Warning 1!');
      expect(context.messages[2]).toEqual('Alert 2!');
      expect(context.messages[3]).toEqual('Warning 3!');

      return callback(null, context);
    };

    rules.push({type: 'check'});
    rules.push({type: 'end'});

    const chain = new Chain(rules, ctx);
    
    chain.start();
  });
});