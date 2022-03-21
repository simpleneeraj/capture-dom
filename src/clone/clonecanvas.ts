import createImage from '../utils/createimage';

async function cloneCanvas(node: HTMLCanvasElement) {
  const dataURL = node.toDataURL();
  if (dataURL === 'data:,') {
    return Promise.resolve(node.cloneNode(false) as HTMLCanvasElement);
  }
  return createImage(dataURL);
}

export default cloneCanvas;
