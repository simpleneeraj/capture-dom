import getSVG from './generatedataurl';
import { Options } from '../options';
import imageSize from '../utils/imagesize';
import createImage from '../utils/createimage';
import getPixelRatio from '../utils/getpixelratio';

/**
 * Draw dom-node to HTML Canvas Element
 * @param node
 * @param options
 * @returns `HTMLCanvasElement`
 */

async function createCanvas<T extends HTMLElement>(
  node: T,
  options: Options = {}
): Promise<HTMLCanvasElement | any> {
  try {
    // creating Url
    const svg = await getSVG(node, options);
    // creating Img
    const img = await createImage(svg);
    // creating Canvas
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    const ratio = options.pixelRatio || getPixelRatio();
    const { width, height } = imageSize(node, options);
    const canvasWidth = options.canvasWidth || width;
    const canvasHeight = options.canvasHeight || height;
    canvas.width = canvasWidth * ratio;
    canvas.height = canvasHeight * ratio;
    // Checking Dimensions
    if (!options.skipAutoScale) {
      dimension(canvas);
    }
    canvas.style.width = `${canvasWidth}`;
    canvas.style.height = `${canvasHeight}`;

    if (options.backgroundColor) {
      context.fillStyle = options.backgroundColor;
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    // Retured Canvas

    return canvas;
  } catch (e) {
    console.error(e);
  }
}

export default createCanvas;

/**
 * Learn more about canvas maximum canvas size
 * [Read More](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas#maximum_canvas_size)
 * CanvasLimit Dimension
 */

function dimension(canvas: HTMLCanvasElement) {
  const limit = 16384; // as per
  if (canvas.width > limit || canvas.height > limit) {
    if (canvas.width > limit && canvas.height > limit) {
      if (canvas.width > canvas.height) {
        canvas.height *= limit / canvas.width;
        canvas.width = limit;
      } else {
        canvas.width *= limit / canvas.height;
        canvas.height = limit;
      }
    } else if (canvas.width > limit) {
      canvas.height *= limit / canvas.width;
      canvas.width = limit;
    } else {
      canvas.width *= limit / canvas.height;
      canvas.height = limit;
    }
  }
}
