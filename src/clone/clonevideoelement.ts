import { Options } from '../options';
import { getBlobFromURL } from '../blobfromurl';
import createImage from '../utils/createimage';
import getMimeType from '../utils/getmimetype';
import makeDataUrl from '../utils/makedataurl';

async function cloneVideoElement(node: HTMLVideoElement, options: Options) {
  return Promise.resolve(node.poster)
    .then(url => getBlobFromURL(url, options))
    .then(data =>
      makeDataUrl(data.blob, getMimeType(node.poster) || data.contentType)
    )
    .then(dataURL => createImage(dataURL));
}

export default cloneVideoElement;
