import merge from 'lodash.merge';
import forEach from 'lodash.foreach';
import Configly from 'configly';
import formats from './formats';
import outputs from './outputs';
import Logger from './logger';

export const LOGGERLY_ENV = 'LOGGER_CONFIG';
export const LOGGERLY_BROWSER = 'loggerlyConfig';
export const LOGGERLY_NOOP = 'LOGGER_NOOP';

const LOG_LEVELS = {
  none: -1,
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
  all: 10
};
const DEFAULT_CONFIG = {
  default: {
    level: LOG_LEVELS['info'],
    format: 'full',
    output: 'console'
  }
};

/**
 * Logging
 */
class Loggerly {
  /**
   * Default constructor
   */
  constructor() {
    this.defaultConfig = DEFAULT_CONFIG;
    this.loggers = {};
    this.initialized = false;
    this.levelNames = {};
    forEach(LOG_LEVELS, (level, name) => {
      this[name.toUpperCase()] = level;
      this.levelNames[level] = name.toUpperCase();
    });
  }

  init(loggerlyConfig) {
    //console.log('loggerlyConfig', loggerlyConfig);
    const config = Configly.getConfig(loggerlyConfig, LOGGERLY_ENV, LOGGERLY_BROWSER);
    //console.log('config', config);

    this.config = merge({}, this.defaultConfig, config);
    forEach(this.loggers, (logger, name) => {
      this.updateLogger(logger, this.config[name] || this.config.default, name);
    });
    this.initialized = true;
  }

  _updateOptions(opts, name) {
    const options = Object.assign({}, opts);
    options.name = name || options.name;
    options.level = (typeof options.level === 'string') ? LOG_LEVELS[options.level.toLowerCase()] : options.level;
    options.format = (typeof options.format === 'string') ? formats[options.format] : options.format || formats.full;
    options.output = (typeof options.output === 'string') ? outputs[options.output] : options.output || outputs.console;
    options.levels = LOG_LEVELS;
    return options;
  }
  /**
   * Creates a new logger
   * @param {} opts
   * @param {*} name
   */
  createLogger(opts, name) {
    //console.log('createLogger', opts, name);
    const options = this._updateOptions(opts, name);
    return new Logger(options);
  }
  updateLogger(logger, opts, name) {
    const options = this._updateOptions(opts, name);
    logger.update(options);
  }

  getLogger(name) {
    if (!this.initialized) {
      this.init();
    }
    if (!this.loggers[name]) {
      this.loggers[name] = this.createLogger(this.config[name] || this.config.default, name);
    }
    return this.loggers[name];
  }
}

export const loggerly = new Loggerly();
export default loggerly;

