import { Options } from '../options';

function px(node: HTMLElement, styleProperty: string) {
  const val = window.getComputedStyle(node).getPropertyValue(styleProperty);
  return parseFloat(val.replace('px', ''));
}

function getNodeHeight(node: HTMLElement) {
  const topBorder = px(node, 'border-top-width');
  const bottomBorder = px(node, 'border-bottom-width');
  return node.clientHeight + topBorder + bottomBorder;
}

function getNodeWidth(node: HTMLElement) {
  const leftBorder = px(node, 'border-left-width');
  const rightBorder = px(node, 'border-right-width');
  return node.clientWidth + leftBorder + rightBorder;
}

function imageSize(node: HTMLElement, options: Options = {}) {
  const width = options.width || getNodeWidth(node);
  const height = options.height || getNodeHeight(node);
  return { width, height };
}

export default imageSize;
