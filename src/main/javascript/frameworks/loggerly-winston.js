export default class LoggerlyWinston {
  init(config) {
    this.config = config;
    try {
      /* global require */
      this.winston = require('winston');
    } catch(error) {
      throw new Error('Loggerly: winston framework specified, but no winston module found.');
    }
  }

  createLogger(config) {
    config;
  }
}
