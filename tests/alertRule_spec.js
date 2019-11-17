describe('alert rule', () => {

  const context = {
    messages: []
  };
  const rule = require('./alertRule');

  it('should supply type', () => {

    expect(rule.type).toEqual('alert');
  });

  it('should return message', () => {

    const message = `Alert ${context.messages.length}!`;

    expect(rule.getAlert(context)).toEqual(message);
  });
});