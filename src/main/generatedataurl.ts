import miniSVG from './minisvg';
import createSvg from './createsvg';
import { Options } from '../options';

/**
 *
 * @param node
 * @param options
 * @returns
 */

async function generateDataURL<T extends HTMLElement>(
  node: T,
  options: Options = {}
): Promise<string | any> {
  try {
    const svg = await createSvg(node, options);
    const dataURL = miniSVG(svg);
    return Promise.resolve(dataURL);
  } catch (error) {
    console.error(error);
  }
}

export default generateDataURL;
