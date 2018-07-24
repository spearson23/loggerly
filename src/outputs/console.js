export default (logger, level, args) => {
  if (level <= 1) {
    console.error(...args);
  } else if (level <=2) {
    console.warn(...args);
  } else {
    console.log(...args);
  }
};
