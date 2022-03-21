function makeDataUrl(content: string, mimeType: string) {
  return `data:${mimeType};base64,${content}`;
}

export default makeDataUrl;
