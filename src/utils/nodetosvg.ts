async function nodeToSVG(
  node: HTMLElement,
  width: number,
  height: number
): Promise<SVGSVGElement> {
  const xmlns = 'http://www.w3.org/2000/svg';
  const xhtml = 'http://www.w3.org/1999/xhtml';


  const firstElement = node.firstChild!.parentElement;
  // const allElement = node.childNodes;
  // Creating Elements
  const svg = document.createElementNS(xmlns, 'svg');
  const foreignObject = document.createElementNS(xmlns, 'foreignObject');
  // svg  Attribute Setting
  svg.setAttribute('xmlns', xmlns);
  svg.setAttribute('width', `${width}`);
  svg.setAttribute('height', `${height}`);
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

  // foreignObject Attribute Setting
  foreignObject.setAttribute('x', '0');
  foreignObject.setAttribute('y', '0');
  foreignObject.setAttribute('width', '100%');
  foreignObject.setAttribute('height', '100%');
  foreignObject.setAttribute('externalResourcesRequired', 'true');
  svg.appendChild(foreignObject);
  // For Buidling Powerful SVG
  firstElement!.setAttribute('xmlns', xhtml);
  foreignObject.append(node);
  return svg;
}

export default nodeToSVG;
