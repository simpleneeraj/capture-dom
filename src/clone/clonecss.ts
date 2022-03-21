import toArray from '../utils/toarray';

interface CustomStyle extends CSSStyleDeclaration {
  backdropFilter?: string;
}
function cloneCSSStyle<T extends HTMLElement>(nativeNode: T, clonedNode: T) {
  const source: CustomStyle = window.getComputedStyle(nativeNode);
  const target: CustomStyle = clonedNode.style;
  if (!target) {
    return;
  }
  if (source.cssText) {
    target.cssText = source.cssText;
  } else {
    const cssText = Object.values(source).reduce((css, property) => {
      const letCssText = `${css}${property}:${source.getPropertyValue(
        property
      )}`;
      return letCssText;
    });
    target.cssText = cssText;
    toArray<string>(source).forEach(name => {
      const value = source.getPropertyValue(name);
      const priority = source.getPropertyPriority(name);
      target.setProperty(name, value, priority);
      // Apply Custom Property `backdrop-filter` doen't exist in CSSStyleDeclaration
      target.setProperty(
        '-webkit-backdrop-filter',
        `${source.getPropertyValue('backdrop-filter')}`
      );
      target.backdropFilter = source.getPropertyValue('backdrop-filter');
    });
  }
}

export default cloneCSSStyle;
