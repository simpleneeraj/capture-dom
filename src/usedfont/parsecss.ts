import { commentsRegex, keyframesRegex } from '../utils/regex';

function parseCSS(source: string) {
  if (source == null) {
    return [];
  }
  const result: string[] = [];

  // strip out comments
  let cssText = source.replace(commentsRegex, '');
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const matches = keyframesRegex.exec(cssText);
    if (matches === null) {
      break;
    }
    result.push(matches[0]);
  }
  cssText = cssText.replace(keyframesRegex, '');

  const importRegex = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi;
  // to match css & media queries together
  const combinedCSSRegex =
    '((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]' +
    '*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})';
  // unified regex
  const unifiedRegex = new RegExp(combinedCSSRegex, 'gi');
  // eslint-disable-next-line no-constant-condition
  while (true) {
    let matches = importRegex.exec(cssText);
    if (matches === null) {
      matches = unifiedRegex.exec(cssText);
      if (matches === null) {
        break;
      } else {
        importRegex.lastIndex = unifiedRegex.lastIndex;
      }
    } else {
      unifiedRegex.lastIndex = importRegex.lastIndex;
    }
    result.push(matches[0]);
  }

  return result;
}

export default parseCSS;
