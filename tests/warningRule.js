module.exports = {
  type: 'warning',
  getWarning(context) {
    return `Warning ${context.messages.length}!`;
  }
};