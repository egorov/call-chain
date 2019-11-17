module.exports = {
  type: 'alert',
  getAlert(context) {
    return `Alert ${context.messages.length}!`;
  }
};