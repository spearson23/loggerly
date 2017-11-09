import Loggerly from './Loggerly';
import util from 'util';

export default class Logger {
  constructor(config) {
    this.config = config;
  }
  _out(level, text) {
    // Must be implemented by sub-classes
  }
  out(level, first, ...args) {
    if (this.level <= level) {
      if ((typeof first === 'object') && (first.raw) && (typeof first.length !== 'undefined') && (first.length === first.raw.length)) {
        let result = first[0];
        args.forEach((arg, i) => {
            result += String(arg);
            result += first[i+1];
        });
        this._out(level, result);
      } else {
        this._out(level, util.format(first, ...args));
      }
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
