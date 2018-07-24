export default (logger, level, args) => {
  logger.string = args.map(arg => args.format(arg)).join(args.separator || '');
};
