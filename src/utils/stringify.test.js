/* global test expect */
import stringify from './stringify';

test('simple', () => {
  const result = stringify({ key: 'value' });
  expect(result).toBe('{"key":"value"}');
});

test('depth 1', () => {
  const result = stringify({ object: { key: 'value' } }, undefined, undefined, 1);
  expect(result).toBe('{"object":"[object Object]"}');
});
