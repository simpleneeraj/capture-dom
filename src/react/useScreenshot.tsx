import * as React from "react";
import saveAs from "../main/saveas";
import { Options } from "../options";

/**
 * You don't need to add extra lines to get element
 * now the time to focus on building program by adding your HTMLElement
 * `id` or `className`
 * @param selector  `id` or `className` of your `HTMLElement`
 * How to use this hook
 * ```js
 * import { useScreenshot } from "screenshotjs";
 * ```
 * And then use like this
 * ```js
 * const capture = useScreenshot('.center');
 * ```
 * @returns `() => Promise<void>`
 */

const useScreenshot = (selector: string) => {
  if (typeof selector !== "string") {
    throw new Error(`Expected string but got ${typeof selector}`);
  }
  // capture Handler as Simple as That
  const captureHandler = React.useCallback(
    async (options?: Options): Promise<void> => {
      try {
        await saveAs(selector, options);
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    [selector]
  );

  /**
   * A basic handler to download image it's so simple and effective
   * @param options - ScreenshotOptions for customize your output image
   */
  const captureImage = React.useMemo(() => captureHandler, [captureHandler]);

  return captureImage;
};

export default useScreenshot;
