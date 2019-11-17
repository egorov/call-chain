describe('warning rule', () => {

  const context = {
    messages: []
  };
  const rule = require('./warningRule');

  it('should supply type', () => {

    expect(rule.type).toEqual('warning');
  });

  it('should return message', () => {

    const message = `Warning ${context.messages.length}!`;

    expect(rule.getWarning(context)).toEqual(message);
  });
});