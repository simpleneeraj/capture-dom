function resolveUrl(url: string, baseUrl: string | null): string {
  // url is absolute already
  if (url.match(/^[a-z]+:\/\//i)) {
    return url;
  }

  // url is absolute already, without protocol
  if (url.match(/^\/\//)) {
    return window.location.protocol + url;
  }

  // dataURI, mailto:, tel:, etc.
  if (url.match(/^[a-z]+:/i)) {
    return url;
  }

  const doc = document.implementation.createHTMLDocument();
  const base = doc.createElement('base');
  const a = doc.createElement('a');

  doc.head.appendChild(base);
  doc.body.appendChild(a);

  if (baseUrl) {
    base.href = baseUrl;
  }

  a.href = url;

  return a.href;
}

export default resolveUrl;
