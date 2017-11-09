export default class LoggerlyBunyan {
  init(config) {
    this.config = config;
    try {
      /* global require */
      this.bunyan = require('bunyan');
    } catch(error) {
      throw new Error('Loggerly: bunyan framework specified, but no bunyan module found.');
    }
  }

  createLogger(config) {
    config;
  }
}
