import { Options } from '../options';
import { getBlobFromURL } from '../blobfromurl';
import getMimeType from '../utils/getmimetype';
import isDataUrl from '../utils/isdataurl';
import makeDataUrl from '../utils/makedataurl';

async function embedImageNode<T extends HTMLElement | SVGImageElement>(
  clonedNode: T,
  options: Options
): Promise<T> {
  if (
    !(clonedNode instanceof HTMLImageElement && !isDataUrl(clonedNode.src)) &&
    !(
      clonedNode instanceof SVGImageElement &&
      !isDataUrl(clonedNode.href.baseVal)
    )
  ) {
    return Promise.resolve(clonedNode);
  }

  const src =
    clonedNode instanceof HTMLImageElement
      ? clonedNode.src
      : clonedNode.href.baseVal;

  return Promise.resolve(src)
    .then(url => getBlobFromURL(url, options))
    .then(data => makeDataUrl(data.blob, getMimeType(src) || data.contentType))
    .then(
      dataURL =>
        new Promise((resolve, reject) => {
          clonedNode.onload = resolve;
          clonedNode.onerror = reject;
          if (clonedNode instanceof HTMLImageElement) {
            clonedNode.srcset = '';
            clonedNode.src = dataURL;
          } else {
            clonedNode.href.baseVal = dataURL;
          }
        })
    )
    .then(
      () => clonedNode,
      () => clonedNode
    );
}

export default embedImageNode;
