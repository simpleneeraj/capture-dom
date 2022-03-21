export const URL_REGEX = /url\((['"]?)([^'"]+?)\1\)/g;
export const URL_WITH_FORMAT_REGEX =
  /url\([^)]+\)\s*format\((["'])([^"']+)\1\)/g;
export const FONT_SRC_REGEX =
  /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;

// All Regex
export const regexUrl = /url\(["']?([^"')]+)["']?\)/g;
export const commentsRegex = /(\/\*[\s\S]*?\*\/)/gi;
export const keyframesRegex = new RegExp(
  '((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})',
  'gi'
);
