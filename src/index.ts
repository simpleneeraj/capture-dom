/*****************************************
 *****************************************
 **************capture-dom****************
 *****************************************
 ****************v1.0.0*******************
 *****************************************
 *****************************************/
/**
 * Here types of our liberary
 */
export type { Options as ScreenshotOptions } from './options';
/**
 * Here For React only
 */
export { default as Capture } from './react';
export { default as useScreenshot } from './react/useScreenshot';
/**
 * Get Image
 * Here All Format Images
 */
// same
export { default as saveAs } from './main/saveas';
export { default as downloadAs } from './main/saveas';
// same
export { default as getBase64 } from './main/tobase64';
export { default as toDataURL } from './main/tobase64';
// 
export { default as getSVGElement } from './main/createsvg';
export { default as getCanvasElement } from './main/createcanvas';

