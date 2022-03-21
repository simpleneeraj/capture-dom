function toRegex(url: string): RegExp {
  // eslint-disable-next-line no-useless-escape
  const escaped = url.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1');
  return new RegExp(`(url\\(['"]?)(${escaped})(['"]?\\))`, 'g');
}

export default toRegex;
