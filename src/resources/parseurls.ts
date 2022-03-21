import isDataUrl from '../utils/isdataurl';
import { URL_REGEX } from '../utils/regex';

function parseURLs(cssText: string): string[] {
  const result: string[] = [];

  cssText.replace(URL_REGEX, (raw, _quotation, url) => {
    result.push(url);
    return raw;
  });

  return result.filter(url => !isDataUrl(url));
}

export default parseURLs;
