function isDataUrl(url: string) {
  return url.search(/^(data:)/) !== -1;
}
export default isDataUrl;
