import { Options } from '../options';
import cloneChildren from './clonechildren';
import cloneCSSStyle from './clonecss';
import cloneInputValue from './cloneinputvalue';
import clonePseudoElements from './clonepseudoelements';
import cloneSingleNode from './clonesinglenode';

async function decorate<T extends HTMLElement>(
  nativeNode: T,
  clonedNode: T
): Promise<T> {
  if (!(clonedNode instanceof Element)) {
    return Promise.resolve(clonedNode);
  }
  // return
  cloneCSSStyle(nativeNode, clonedNode);
  clonePseudoElements(nativeNode, clonedNode);
  cloneInputValue(nativeNode, clonedNode);
  return Promise.resolve(clonedNode);
}

async function cloneNode<T extends HTMLElement>(
  node: T,
  options: Options,
  isRoot?: boolean
): Promise<T | any> {
  if (!isRoot && options.filter && !options.filter(node)) {
    return Promise.resolve(null);
  }
  try {
    const clonedNode = await Promise.resolve(node);
    const singleNode = await cloneSingleNode(clonedNode, options);
    const childNode = await cloneChildren(node, singleNode, options);
    const decorateNode = decorate(node, childNode);
    // console.log(await decorateNode);
    return await decorateNode;
  } catch (error) {
    console.log('Error in Cloning Node', error);
  }
}

export default cloneNode;
