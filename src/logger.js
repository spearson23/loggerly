import merge from 'lodash.merge';
import forEach from 'lodash.foreach';

export default class Logger {
  constructor(opts) {
    this.update(opts);
  }
  update(opts) {
    merge(this, opts);
    forEach(this.levels, (level, name) => {
      if (level <= this.level) {
        this[name] = function (msg, ...args) { this._log(level, msg, ...args); };
      } else {
        this[name] = () => { };
      }
    });
  }
  _log(level, msg, ...args) {
    this.output(this, level, this.format(this, level, msg, ...args));
  }
  log(level, msg, ...args) {
    if (level <= this.level) {
      this._log(level, msg, ...args);
    }
  }
}
