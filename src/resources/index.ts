import { Options } from '../options';
import embed from './embed';
import parseURLs from './parseurls';
import preferredFontFormat from './preferredfont';
import shouldEmbed from './shouldembed';

async function embedResources(
  cssText: string,
  baseUrl: string | null,
  options: Options
): Promise<string> {
  if (!shouldEmbed(cssText)) {
    return Promise.resolve(cssText);
  }
  const filteredCSSText = preferredFontFormat(cssText, options);
  return Promise.resolve(filteredCSSText)
    .then(parseURLs)
    .then(urls =>
      urls.reduce(
        (deferred, url) =>

          deferred.then(css => embed(css, url, baseUrl, options)),
        Promise.resolve(filteredCSSText)
      )
    );
}

export default embedResources;
