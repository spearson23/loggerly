import Loggerly from './Loggerly';

export default class Logger {
  constructor(config) {
    this.config = config;
  }
  _out(level, ...args) {
    // Must be implemented by sub-classes
  }
  out(level, ...args) {
    if (this.level >= level) {
      this._out(level, ...args);
    }
  }
  fatal(...args) {
    this.out(Loggerly.FATAL, ...args);
  }
  error(...args) {
    this.out(Loggerly.ERROR, ...args);
  }
  warn(...args) {
    this.out(Loggerly.WARN, ...args);
  }
  info(...args) {
    this.out(Loggerly.INFO, ...args);
  }
  log(...args) {
    this.out(Loggerly.LOG, ...args);
  }
  verbose(...args) {
    this.out(Loggerly.VERBOSE, ...args);
  }
  debug(...args) {
    this.out(Loggerly.DEBUG, ...args);
  }
  silly(...args) {
    this.out(Loggerly.SILLY, ...args);
  }
  trace(...args) {
    this.out(Loggerly.TRACE, ...args);
  }
}
