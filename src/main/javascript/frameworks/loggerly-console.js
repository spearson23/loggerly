import Logger from '../logger';
import Loggerly from '../loggerly';

class ConsoleLogger extends Logger {
  constructor(config) {
    this.config = config;
    this.name = config.name;
    this.level = config.level;
  }
  _out(level, ...args) {
    if (this.level <= Loggerly.ERROR) {
      console.error(this.name + ':', ...args);
    } else {
      console.log(this.name + ':', ...args);
    }
  }
}

export default class LoggerlyConsole {
  init(config) {

  }

  createLogger(config) {
    return new ConsoleLogger(config);
  }
}
