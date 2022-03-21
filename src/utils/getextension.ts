function getExtension(url: string): string {
  const match = /\.([^./]*?)$/g.exec(url);
  return match ? match[1] : '';
}

export default getExtension;
