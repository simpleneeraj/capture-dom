import { Options } from '../options';
import { getBlobFromURL } from '../blobfromurl';
import getMimeType from '../utils/getmimetype';
import makeDataUrl from '../utils/makedataurl';
import resolveUrl from '../utils/resolveurl';
import toRegex from './toregex';

function embed(
  cssText: string,
  resourceURL: string,
  baseURL: string | null,
  options: Options,
  get?: (url: string) => Promise<string>
): Promise<string> {
  const resolvedURL = baseURL ? resolveUrl(resourceURL, baseURL) : resourceURL;
  // console.log(resolvedURL);
  return Promise.resolve(resolvedURL)
    .then<string | { blob: string; contentType: string }>(url =>
      get ? get(url) : getBlobFromURL(url, options)
    )
    .then(data => {
      if (typeof data === 'string') {
        return makeDataUrl(data, getMimeType(resourceURL));
      }
      const generateDataUrl = makeDataUrl(
        data.blob,
        getMimeType(resourceURL) || data.contentType
      );
      // console.log("data", generateDataUrl);
      return generateDataUrl;
    })
    .then(dataURL => cssText.replace(toRegex(resourceURL), `$1${dataURL}$3`))
    .then(
      content => content,
      () => resolvedURL
    );
}

export default embed;
