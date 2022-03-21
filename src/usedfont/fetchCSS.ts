export interface Metadata {
  url: string;
  cssText: Promise<string>;
}

const cssFetchCache: {
  [href: string]: Promise<void | Metadata>;
} = {};

async function fetchCSS(url: string): Promise<void | Metadata> {
  const cache = cssFetchCache[url];

  if (cache != null) {
    return cache;
  }
  const deferred = window.fetch(url).then(res => ({
    url,
    cssText: res.text(),
  }));
  cssFetchCache[url] = deferred;

  return deferred;
}

export default fetchCSS;
