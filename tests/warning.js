module.exports = function warning(error, context, callback) {
  
  if(error)
    return process.nextTick(() => callback(error, context));

  const message = context.rule.getWarning(context);

  context.messages.push(message);

  return process.nextTick(() => callback(null, context));
};