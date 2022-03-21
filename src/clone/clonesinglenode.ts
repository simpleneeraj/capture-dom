import { Options } from '../options';
import cloneCanvas from './clonecanvas';
import cloneVideoElement from './clonevideoelement';

async function cloneSingleNode<T extends HTMLElement>(
  node: T,
  options: Options
): Promise<HTMLElement> {
  if (node instanceof HTMLCanvasElement) {
    return cloneCanvas(node);
  }

  if (node instanceof HTMLVideoElement && node.poster) {
    return cloneVideoElement(node, options);
  }

  return Promise.resolve(node.cloneNode(false) as T);
}

export default cloneSingleNode;
