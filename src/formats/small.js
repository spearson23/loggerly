import Loggerly from '../index';

const isFormat = () => {
  return false;
};

export default (logger, level, msg, ...args) => {
  // Is this a template?
  let output = `${Loggerly.levelNames[level]}: ${logger.name}: `;
  if (Array.isArray(msg) && msg.raw) {
    output[0] += ' ';
    output[0] += msg[0];
    for (let i=1; i<msg.length; i++) {
      output[0] += args[i-1];
      output[0] += msg[i];
    }
  } else if (isFormat(msg)) {
    // TODO: Format strings ('%s: %s')
  } else {
    output += JSON.stringify(msg, undefined, 2);
    for (let i=0; i<args.length; i++) {
      output += args[i];
    }
  }
  return output;
};
