import createSvg from './createsvg';
import download from '../fileSaver';
import { Options } from '../options';
import createCanvas from './createcanvas';

/**
 * Download direct Image of your html div or page using node Selectors only
 * @param nodeSelector
 * @param options
 */
const saveAs = async (
  nodeSelector: string,
  options: Options = {}
): Promise<any> => {
  // For SSR
  if (typeof window === 'undefined') {
    return;
  }
  const element = document.querySelector(nodeSelector) as HTMLElement;
  const { imageFormat } = options;
  try {
    if (imageFormat === 'svg') {
      const svg: SVGSVGElement = await createSvg(element, options);
      const svgBlob = new Blob([svg.outerHTML], { type: 'text/svg+xml' });
      download(svgBlob, randomName(imageFormat));
    } else {
      const canvas = await createCanvas(element, options);
      canvas.toBlob((blob: Blob) => {
        download(blob, randomName(imageFormat));
      }, `image/${imageFormat}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export default saveAs;

const randomName = (imageFormat?: string) => {
  return `IMG_${Date.now()}.${imageFormat}`;
};
