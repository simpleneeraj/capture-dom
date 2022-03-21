import cloneNode from '.';
import { Options } from '../options';
import toArray from '../utils/toarray';
import slotElement from './slotelement';

async function cloneChildren<T extends HTMLElement>(
  nativeNode: T,
  clonedNode: T,
  options: Options
): Promise<T> {
  const children =
    slotElement(nativeNode) && nativeNode.assignedNodes
      ? toArray<T>(nativeNode.assignedNodes())
      : toArray<T>((nativeNode.shadowRoot ?? nativeNode).childNodes);

  if (children.length === 0 || nativeNode instanceof HTMLVideoElement) {
    return Promise.resolve(clonedNode);
  }
  const clonedChild = children
    .reduce(
      (deferred, child) =>
        deferred

          .then(() => cloneNode(child, options))
          .then((clonedChild: HTMLElement | null) => {

            if (clonedChild) {
              clonedNode.appendChild(clonedChild);
            }
          }),
      Promise.resolve()
    )
    .then(() => clonedNode);

  return clonedChild;
}

export default cloneChildren;
