export interface Options {
  /**
   * Width in pixels to be applied to node before rendering.
   */
  width?: number;
  /**
   * Height in pixels to be applied to node before rendering.
   */
  height?: number;
  /**
   * A string value for the background color, any valid CSS color value.
   */
  backgroundColor?: string;
  /**
   * Width in pixels to be applied to canvas on export.
   */
  canvasWidth?: number;
  /**
   * Height in pixels to be applied to canvas on export.
   */
  canvasHeight?: number;
  /**
   * An object whose properties to be copied to node's style before rendering.
   */
  // style?: Partial<CSSStyleDeclaration>
  /**
   * A function taking DOM node as argument. Should return `true` if passed
   * node should be included in the output. Excluding node means excluding
   * it's children as well.
   */
  filter?: (domNode: HTMLElement) => boolean;
  /**
   * A number between `0` and `1` indicating image quality (e.g. 0.92 => 92%)
   * of the JPEG image.
   */
  quality?: number;
  /**
   * Set to `true` to append the current time as a query string to URL
   * requests to enable cache busting.
   */
  cacheBust?: boolean;
  /**
   * A data URL for a placeholder image that will be used when fetching
   * an image fails. Defaults to an empty string and will render empty
   * areas for failed images.
   */
  imagePlaceholder?: string;
  /**
   * The pixel ratio of captured image. Defalut is the actual pixel ratio of
   * the device. Set `1` to use as `initial-scale 1` for the image,
   *
   * Get HD image to increase this
   * value between `1-5` ( Best for CPU )
   */
  pixelRatio?: number;
  /**
   * A boolean to turn off auto scaling for truly massive images..
   */
  skipAutoScale?: boolean;

  /**
   * Customize your image output format
   *
   * supported formats are `png` | `jpeg` |`webp`|`svg`
   * only work when you call
   *
   * ```tsx
   * downloadImage(node: T,options: ScreenshotOptions ): Promise<void>
   * ```
   */
  imageFormat?: 'png' | 'jpeg' | 'webp' | 'svg';
  /**
   * Debug in console to see what's happening when you click on `screenshot.js` handler
   */
  debuger?: boolean;
  /**
   * The preferred font format. If specified all other font formats are ignored.
   */
  preferredFontFormat?:
  | 'woff'
  | 'woff2'
  | 'truetype'
  | 'opentype'
  | 'embedded-opentype'
  | 'svg'
  | string;
}

// process.env.NODE_ENV==='development'
