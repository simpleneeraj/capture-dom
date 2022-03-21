import { Options } from '../options';
import embedBackground from './embedbackground';
import embedChildren from './embedchildren';
import embedImageNode from './embedimagenode';

async function embedImages<T extends HTMLElement>(
  clonedNode: T,
  options: Options
): Promise<T> {
  if (!(clonedNode instanceof Element)) {
    return Promise.resolve(clonedNode);
  }
  return Promise.resolve(clonedNode)
    .then(node => embedBackground(node, options))
    .then(node => embedImageNode(node, options))
    .then(node => embedChildren(node, options));
}

export default embedImages;
