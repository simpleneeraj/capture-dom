import { Options } from '../options';
import cloneNode from '../clone';
import embedImages from '../embed';
import imageSize from '../utils/imagesize';
import nodeToSVG from '../utils/nodetosvg';
import inPageUsedFont from '../usedfont';
import { debug, group, log, now, difference } from '../debug';

/**
 * Creating SVG from dom-node
 * @param node
 * @param options
 * @returns `SVGSVGElement`
 */
const createSvg = async <T extends HTMLElement>(
  node: T,
  options: Options = {}
): Promise<SVGSVGElement | any> => {
  const { width, height } = imageSize(node, options);
  const { debuger } = options;
  try {
    const t0 = now();
    group('#1 HTML to Image', debuger);
    const t1 = now();
    // Step: 1
    const clonedNode = await cloneNode(node, options, true);
    debug(
      `#2 Node and style Cloned Successfully in ${difference(t0, t1)}`,
      debuger
    );
    // Step: 2
    const t2 = now();
    await inPageUsedFont(node, clonedNode);
    debug(
      `#3 Embed font added to style sheet Successfully in ${difference(
        t0,
        t2
      )}`,
      debuger
    );
    // Step: 3
    const t3 = now();
    await embedImages(clonedNode, options);
    debug(
      `#4 Embed Images added to style sheet Successfully in ${difference(
        t0,
        t3
      )}`,
      debuger
    );
    // Step: 4
    const t4 = now();
    const svg = await nodeToSVG(clonedNode, width, height);
    debug(
      `#5 Your Image is ready for download Successfully  in ${difference(
        t0,
        t4
      )}`,
      debuger
    );
    // differenceulating Time in milliseconds
    const t = now();
    log(`%c[Total time] ${difference(t0, t)}`, debuger);
    console.groupEnd();
    return svg;
  } catch (error) {
    console.error(error);
  }
};

export default createSvg;
