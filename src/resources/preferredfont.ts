import { Options } from '../options';
import { FONT_SRC_REGEX, URL_WITH_FORMAT_REGEX } from '../utils/regex';

function preferredFontFormat(
  str: string,
  { preferredFontFormat }: Options
): string {
  const filter = !preferredFontFormat
    ? str
    : str.replace(FONT_SRC_REGEX, (match: string) => {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const [src, , format] = URL_WITH_FORMAT_REGEX.exec(match) || [];
        if (!format) {
          return '';
        }
        if (format === preferredFontFormat) {
          return `src: ${src};`;
        }
      }
    });
  return filter;
}

export default preferredFontFormat;
