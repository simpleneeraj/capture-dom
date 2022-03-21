import { URL_REGEX } from '../utils/regex';

function shouldEmbed(url: string): boolean {
  // console.log(url.search(URL_REGEX) !== -1, url);
  return url.search(URL_REGEX) !== -1;
}

export default shouldEmbed;
