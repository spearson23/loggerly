export default class LoggerlyWinston {
  init(config) {
    try {
      this.winston = require("winston");
    } catch(error) {
      throw new Error("Loggerly: winston framework specified, but no winston module found.");
    }
  }

  createLogger(config) {

  }
}