const stringify = (object, replacer, space, depth=2) => {
  const levels = {};

  function depthReplacer(key, value) {
    if (replacer) {
      value = replacer(key, value);
    }
    const level = key ? levels[this] : 0;
    if (level < depth) {
      levels[value] = level + 1;
      return value;
    } else {
      return new String(value);
    }
  }

  return JSON.stringify(object, depthReplacer, space);
};

export default stringify;
