module.exports = function alert(error, context, callback) {
  
  if(error)
    return process.nextTick(() => callback(error, context));

  const message = context.rule.getAlert(context);

  context.messages.push(message);

  return process.nextTick(() => callback(null, context));
};