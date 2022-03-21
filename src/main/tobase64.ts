import Base64Reader from '../usedfont/filereader';
import { Options } from '../options';
import createCanvas from './createcanvas';
import createSvg from './createsvg';

/**
 * Get base64 string of format you selected using `ScreenshotOptions`
 * default is `png`, but you can select other image formats
 *
 * - supported formates are `png` | `jpeg` | `webp` | `svg`
 * @param node
 * @param options
 * @returns `base64` string of a image
 */

const toBase64 = async <T extends HTMLElement>(
  node: T,
  options: Options = {}
): Promise<any> => {
  const { imageFormat } = options;
  try {
    if (imageFormat === 'svg') {
      const svg = await createSvg(node, options);
      const svgBlob = new Blob([svg.outerHTML], { type: 'image/svg+xml' });
      const base64 = await Base64Reader(svgBlob);
      return Promise.resolve(base64);
    } else {
      const canvas = await createCanvas(node, options);
      const base64 = canvas.toDataURL(`image/${imageFormat}`);
      return Promise.resolve(base64);
    }
  } catch (error) {
    console.log(error);
  }
};

export default toBase64;

// data:image/svg+xml;base64,PHN2Zy
