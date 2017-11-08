import fs from "fs";
import path from "path";
import LoggerlyConsole from './frameworks/loggerly-console';

export default class Loggerly {

  static _loadJson(filename) {
    try {
      const string = fs.readFileSync(filename, 'utf8');
      if (string) {
        return JSON.parse(string);
      }
    } catch(error) {
      console.warn("Loggerly: Failed to load config file (" + filename + "), using default config.");
    }
  }

  static init(config) {
    if (Loggerly.initialized) {
      return;
    }
    if (typeof config === 'string') {
      return init(Loggerly._loadJson(config));
    }
    if (!config) {
      config = process.env[Loggerly.LOGGERLY_CONFIG_VARIABLE];
      if (config) {
        // Found config from environment var
        return Loggerly.init(config);
      } else {
        // Will use only default config
        return Loggerly.init({});
      }
    }
    Loggerly.config = Object.assign({}, Loggerly.DEFAULT_CONFIG, config);

    switch (Loggerly.config.framework) {
      case 'bunyan': {
        Loggerly.framework = new LoggerlyBunyan(Loggerly.config);
        break;
      }
      case 'winston': {
        Loggerly.framework = new LoggerlyWinston(Loggerly.config);
        break;
      }
      case 'console': {
        Loggerly.framework = new LoggerlyConsole(Loggerly.config);
        break;
      }
      default: {
        try {
          const FrameworkClass = require('loggerly-' + Loggerly.config.framework);
          Loggerly.framework = new FrameworkClass(Loggerly.config);
          break;
          } catch(error) {
          throw new Error('Loggerly: Unknown framework (' + Loggerly.config.framework + ')');
        }
      }
    }
    Loggerly.initialized = true;
  }

  static _getLoggerName() {
    const originalPrepareStackTrace = Error.prepareStackTrace;

    let name;
    try {
      Error.prepareStackTrace = function (err, stack) { return stack; };

      const error = new Error();
      const currentFilename = error.stack.shift().getFileName();

      while (error.stack.length) {
        const callerFilename = error.stack.shift().getFileName();

        if (currentFilename !== callerFilename) {
          name = path.basename(currentFilename, path.extname(currentFilename));
          break;
        }
      }
    } catch(error) {
      // Ignore
    }
    Error.prepareStackTrace = originalPrepareStackTrace;
    return name;
  }

  static getLogger(name) {
    if (!Loggerly.initialized) {
      Loggerly.init();
    }
    if (!name) {
      name = Loggerly._getLoggerName();
    }
    if (Loggerly.loggers[name]) {
      return Loggerly.loggers[name];
    }
    const loggerConfig = Object.assign({}, { name: name}, Loggerly.config.loggers['default'], Loggerly.config.loggers[name] || {});
    const logger = Loggerly.loggers[name] = Loggerly.framework.getLogger(loggerConfig);
    return logger;
  }
}


Loggerly.loggers = {};

Loggerly.ALL = 0;
Loggerly.FATAL = 1;
Loggerly.ERROR = 2;
Loggerly.WARN = 3;
Loggerly.INFO = Loggerly.LOG = 4;
Loggerly.VERBOSE = Loggerly.DEBUG = 5;
Loggerly.SILLY = Loggerly.TRACE = 6;
Loggerly.NONE = 10;
Loggerly.OFF = 10;

Loggerly.LevelNames = {
  all: Loggerly.ALL,
  fatal: Loggerly.FATAL,
  error: Loggerly.ERROR,
  warn: Loggerly.WARN,
  info: Loggerly.INFO,
  log: Loggerly.LOG,
  verbose: Loggerly.VERBOSE,
  debug: Loggerly.DEBUG,
  silly: Loggerly.SILLY,
  trace: Loggerly.TRACE,
  none: Loggerly.NONE,
  off: Loggerly.OFF
}

Loggerly.LOGGERLY_CONFIG_VARIABLE = "LOGGERLY_CONFIG";

Loggerly.DEFAULT_CONFIG = {
  framework: 'console',
  loggers: {
    default: {
      level: Loggerly.ERROR
    }
  }
};
