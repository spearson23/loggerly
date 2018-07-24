/* global test expect */
import Loggerly from './index';

const config = {
  test: {
    level: Loggerly.ALL,
    output: 'string'
  },
  test2: {
    level: Loggerly.WARN,
    output: 'string'
  },
  none: {
    level: 'NONE',
    output: 'string'
  },
  test3: {
    level: Loggerly.ALL,
    output: 'string'
  },
  test4: {
    level: Loggerly.ALL,
    format: 'full',
    formatOptions: {
      depth: 0,
    },
    output: 'string'
  }
};

Loggerly.init(config);

test('simple', () => {
  const logger = Loggerly.getLogger('test');
  logger.string = '';
  logger.info('testing');
  expect(logger.string).toBe('INFO: test: testing');
});
test('simple no log', () => {
  const logger = Loggerly.getLogger('test2');
  logger.string = '';
  logger.info('testing');
  expect(logger.string).toBe('');
});
test('simple none', () => {
  const logger = Loggerly.getLogger('none');
  logger.string = '';
  logger.info('testing');
  expect(logger.string).toBe('');
});

test('simple levels', () => {
  const logger = Loggerly.getLogger('test3');
  logger.string = '';
  logger.debug('testing');
  expect(logger.string).toBe('DEBUG: test3: testing');
});


test('multiple', () => {
  const logger = Loggerly.getLogger('test');
  logger.string = '';
  const string = 'string';
  logger.info('testing', string);
  expect(logger.string).toBe('INFO: test: testing string');
});


test('template', () => {
  const logger = Loggerly.getLogger('test');
  logger.string = '';
  const string = 'string';
  logger.info`testing ${string} here`;
  expect(logger.string).toBe('INFO: test: testing string here');
});


test('object', () => {
  const logger = Loggerly.getLogger('test');
  logger.string = '';
  const object = { key: 'value' };
  logger.info('testing', object);
  expect(logger.string).toBe('INFO: test: testing { key: \'value\' }');
});
test('template object', () => {
  const logger = Loggerly.getLogger('test');
  logger.string = '';
  const object = { key: 'value' };
  logger.info`testing ${object} here`;
  expect(logger.string).toBe('INFO: test: testing { key: \'value\' } here');
});


test('object depth', () => {
  const logger = Loggerly.getLogger('test4');
  logger.string = '';
  const object = { object: { key: 'value' } };
  logger.info('testing', object);
  expect(logger.string).toBe('INFO: test4: testing { object: [Object] }');
});
