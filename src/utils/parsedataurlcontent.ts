function parseDataUrlContent(dataURL: string) {
  return dataURL.split(/,/)[1];
}

export default parseDataUrlContent;
