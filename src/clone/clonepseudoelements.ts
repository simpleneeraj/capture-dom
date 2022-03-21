import toArray from '../utils/toarray';
import uuid from '../utils/uuid';

type Pseudo = ':before' | ':after';

function formatCSSText(style: CSSStyleDeclaration) {
  const content = style.getPropertyValue('content');
  const formtedCSS = `${style.cssText} content: '${content.replace(
    /'|"/g,
    ''
  )}';`;
  return formtedCSS;
}

function formatCSSProperties(style: CSSStyleDeclaration) {
  return toArray<string>(style)
    .map(name => {
      const value = style.getPropertyValue(name);
      const priority = style.getPropertyPriority(name);
      return `${name}: ${value}${priority ? ' !important' : ''};`;
    })
    .join(' ');
}

function getPseudoElementStyle(
  className: string,
  pseudo: Pseudo,
  style: CSSStyleDeclaration
): Text {
  const selector = `.${className}:${pseudo}`;
  const cssText = style.cssText
    ? formatCSSText(style)
    : formatCSSProperties(style);

  return document.createTextNode(`${selector}{${cssText}}`);
}

function clonePseudoElement<T extends HTMLElement>(
  nativeNode: T,
  clonedNode: T,
  pseudo: Pseudo
) {
  const style = window.getComputedStyle(nativeNode, pseudo);
  const content = style.getPropertyValue('content');
  if (content === '' || content === 'none') {
    return;
  }

  const className = uuid();

  try {
    clonedNode.className = `${clonedNode.className} ${className}`;
  } catch (err) {
    return;
  }

  const styleElement = document.createElement('style');
  styleElement.appendChild(getPseudoElementStyle(className, pseudo, style));
  clonedNode.appendChild(styleElement);
}

function clonePseudoElements<T extends HTMLElement>(
  nativeNode: T,
  clonedNode: T
) {
  clonePseudoElement(nativeNode, clonedNode, ':before');
  clonePseudoElement(nativeNode, clonedNode, ':after');
}

export default clonePseudoElements;
