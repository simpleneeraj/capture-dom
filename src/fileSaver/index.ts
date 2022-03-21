let element: HTMLAnchorElement | null = null;
let textEncoder: TextEncoder | null = null;

/**
 * Get an anchor element.
 *
 * @returns {HTMLElement}
 */
function getElement(): HTMLElement {
  if (element === null) {
    element = document.createElement('a');
  }
  return element;
}

/**
 * Get an instance of TextEncoder.
 *
 * @returns {TextEncoder}
 */
function getTextEncoder(): TextEncoder {
  if (textEncoder === null) {
    textEncoder = new TextEncoder();
  }

  return textEncoder;
}

/**
 * Return an object URL based on the given data.
 *
 * @param {string|Blob|ArrayBuffer} data
 *
 * @returns {*}
 */
function getObjectUrl(data: BlobPart | any): any {
  let blob;
  if (typeof data === 'object' && data.constructor.name === 'Blob') {
    blob = data;
  } else if (typeof data === 'string') {
    blob = new Blob([getTextEncoder().encode(data).buffer], {
      type: 'application/octet-stream',
    });
  } else if (
    typeof data === 'object' &&
    data.constructor &&
    data.constructor.name === 'ArrayBuffer'
  ) {
    blob = new Blob([data], {
      type: 'application/octet-stream',
    });
  } else {
    throw new Error(
      'in-browser-download: Data must either be a Blob, a string or an ArrayBuffer',
    );
  }
  return URL.createObjectURL(blob);
}

/**
 * Download a Blob, a string or an ArrayBuffer as a file in the browser
 *
 * @param {string|ArrayBuffer} data The content of the file to download.
 * @param {string} [filename] The name of the file to download.
 */
function download(data: BlobPart | undefined, filename: string) {
  const element = getElement();
  const url = getObjectUrl(data);
  element.setAttribute('href', url);
  element.setAttribute('download', filename);
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  setTimeout(function () {
    URL.revokeObjectURL(url);
  }, 100);
}

/**
 * Check if all the required APIs are supported by the browser.
 *
 * @returns {boolean}
 */
download.isSupported = function (): boolean {
  return (
    !!window['TextEncoder'] &&
    !!window['Blob'] &&
    !!window['URL'] &&
    typeof URL.createObjectURL === 'function' &&
    typeof URL.revokeObjectURL === 'function'
  );
};


export default download