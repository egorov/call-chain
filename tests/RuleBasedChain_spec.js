describe('Rule based chain', () => {

  const ctx = {
    alert (error, context, callback) {

      if(error)
        return callback(error, context);

      const message = context.rule.getAlert(context);

      context.messages.push(message);

      return callback(null, context);
    },
    warning (error, context, callback) {
      
      if(error)
        return callback(error, context);

      const message = context.rule.getWarning(context);

      context.messages.push(message);

      return callback(null, context);
    },
    messages: []
  };
  const Chain = require('../src/RuleBasedChain');
  const alert = { 
    type: 'alert',
    getAlert(context) {
      return `Alert ${context.messages.length}!`;
    }
  };
  const warning = {
    type: 'warning',
    getWarning(context) {      
      return `Warning ${context.messages.length}!`;
    }
  };
  const rules = [
    alert,
    warning,
    alert,
    warning
  ];

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