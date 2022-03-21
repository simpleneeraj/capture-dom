<h1 align="center">capture-dom</h1>

<p align="center"><strong>Generates an image from a DOM node using HTML5 canvas and SVG</strong></p>

<p align="center">Fork from <a href="https://github.com/tsayen/dom-to-image" rel="nofollow">html-to-image</a> with more maintainable code and some new features.</p>

<p align="center">
<a href="/LICENSE"><img src="https://img.shields.io/github/license/neerajcodes/capture-dom?style=flat-square" alt="MIT License"></a>
<a href="https://www.typescriptlang.org"><img alt="Language" src="https://img.shields.io/badge/language-TypeScript-blue.svg?style=flat-square"></a>
<a href="https://github.com/neerajcodes/capture-dom/pulls"><img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square"></a>
<a href="https://github.com/neerajcodes/capture-dom/actions/workflows/release.yml"><img alt="build" src="https://img.shields.io/github/workflow/status/neerajcodes/capture-dom/%F0%9F%91%B7%E3%80%80CI/master?logo=github&style=flat-square"></a>
<a href="https://app.codecov.io/gh/neerajcodes/capture-dom"><img alt="coverage" src="https://img.shields.io/codecov/c/gh/neerajcodes/capture-dom?logo=codecov&style=flat-square&token=BWweeU2uNX"></a>
<a href="https://lgtm.com/projects/g/neerajcodes/capture-dom/context:javascript" rel="nofollow"><img alt="Language grade: JavaScript" src="https://img.shields.io/lgtm/grade/javascript/g/neerajcodes/capture-dom.svg?logo=lgtm&style=flat-square" /></a>
</p>

<p align="center">
<a href="https://www.npmjs.com/package/capture-dom" rel="nofollow"><img alt="NPM Package" src="https://img.shields.io/npm/v/capture-dom.svg?style=flat-square" /></a>
<a href="https://www.npmjs.com/package/capture-dom" rel="nofollow"><img alt="NPM Downloads" src="http://img.shields.io/npm/dm/capture-dom.svg?style=flat-square" /></a>

## Install

```shell
npm install --save capture-dom
```

## Usage

```js
/* ES6 */
import * as htmlToImage from 'capture-dom';
import { saveAs, saveAs, toBlob, toPixelData, toSvg } from 'capture-dom';

/* ES5 */
var htmlToImage = require('capture-dom');
```

All the top level functions accept DOM node and rendering options, and return a promise fulfilled with corresponding dataURL:

- [saveAs](#saveAs)
- [getBase64](#getBase64)
- [getSVGElement](#getSVGElement)
- [getCanvasElement](#getCanvasElement)

```

## Options

### filter

```ts
(domNode: HTMLElement) => boolean
```

A function taking DOM node as argument. Should return true if passed node should be included in the output. Excluding node means excluding it's children as well.

You can add filter to every image function. For example, 

```js
const filter = (node)=>{
  const exclusionClasses = ['remove-me', 'secret-div'];
  return !exclusionClasses.some(classname=>node.classList.includes(classname));
}

saveAs(node, {imageFormat:'png', quality: 0.95, filter: filter});
```
or

```js
saveAs(node, {imageFormat:'jpg',filter:filter})
```

Not called on the root node.

### backgroundColor

A string value for the background color, any valid CSS color value.

### width, height

Width and height in pixels to be applied to node before rendering.

### canvasWidth, canvasHeight

Allows to scale the canva's size including the elements inside to a given width and height (in pixels).

### style

An object whose properties to be copied to node's style before rendering. You might want to check [this reference](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Properties_Reference) for JavaScript names of CSS properties.

### quality

A number between `0` and `1` indicating image quality (e.g. `0.92` => `92%`) of the JPEG image.

Defaults to `1.0` (`100%`)

### cacheBust

Set to true to append the current time as a query string to URL requests to enable cache busting.

Defaults to `false`

### imagePlaceholder

A data URL for a placeholder image that will be used when fetching an image fails.

Defaults to an empty string and will render empty areas for failed images.

### pixelRatio

The pixel ratio of the captured image. Default use the actual pixel ratio of the device. Set `1` to
use as initial-scale `1` for the image.

### preferredFontFormat

The format required for font embedding. This is a useful optimisation when a webfont provider
specifies several different formats for fonts in the CSS, for example:

```css
@font-face {
  name: 'proxima-nova';
  src: url("...") format("woff2"), url("...") format("woff"), url("...") format("opentype");
}
```

Instead of embedding each format, all formats other than the one specified will be discarded. If
this option is not specified then all formats will be downloaded and embedded.

### fontEmbedCSS

When supplied, the library will skip the process of parsing and embedding webfont URLs in CSS,
instead using this value. This is useful when combined with `getFontEmbedCSS()` to only perform the
embedding process a single time across multiple calls to library functions.

```javascript
const fontEmbedCss = await getFontEmbedCSS(element1);
html2Image.toSVG(element1, { fontEmbedCss });
html2Image.toSVG(element2, { fontEmbedCss });
```

### skipAutoScale

When supplied, the library will skip the process of scaling extra large doms into the canvas object.
You may experience loss of parts of the image if set to `true` and you are exporting a very large image.

Defaults to `false`  

### type

A string indicating the image format. The default type is image/png; that type is also used if the given type isn't supported.
When supplied, the toCanvas function will return a blob matching the given image type and quality. 

Defaults to `image/png`  

## Browsers

Only standard lib is currently used, but make sure your browser supports:

- [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- SVG `<foreignObject>` tag

It's tested on latest Chrome and Firefox (49 and 45 respectively at the time of writing), with Chrome performing significantly better on big DOM trees, possibly due to it's more performant SVG support, and the fact that it supports `CSSStyleDeclaration.cssText` property.

*Internet Explorer is not (and will not be) supported, as it does not support SVG `<foreignObject>` tag.*

*Safari is not supported, as it uses a stricter security model on `<foreignObject>` tag. Suggested workaround is to use `toSvg` and render on the server.*

## How it works

There might some day exist (or maybe already exists?) a simple and standard way of exporting parts of the HTML to image (and then this script can only serve as an evidence of all the hoops I had to jump through in order to get such obvious thing done) but I haven't found one so far.

This library uses a feature of SVG that allows having arbitrary HTML content inside of the `<foreignObject>` tag. So, in order to render that DOM node for you, following steps are taken:

1. Clone the original DOM node recursively
2. Compute the style for the node and each sub-node and copy it to corresponding clone 
   - and don't forget to recreate pseudo-elements, as they are not cloned in any way, of course
3. Embed web fonts
   - find all the `@font-face` declarations that might represent web fonts
   - parse file URLs, download corresponding files
   - base64-encode and inline content as dataURLs
   - concatenate all the processed CSS rules and put them into one `<style>` element, then attach it to the clone
4. Embed images
   - embed image URLs in `<img>` elements
   - inline images used in `background` CSS property, in a fashion similar to fonts
5. Serialize the cloned node to XML
6. Wrap XML into the `<foreignObject>` tag, then into the SVG, then make it a data URL
7. Optionally, to get PNG content or raw pixel data as a Uint8Array, create an Image element with the SVG as a source, and render it on an off-screen canvas, that you have also created, then read the content from the canvas
8. Done!


## Things to watch out for

- If the DOM node you want to render includes a `<canvas>` element with something drawn on it, it should be handled fine, unless the canvas is [tainted](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image) - in this case rendering will rather not succeed.
- Rendering will failed on huge DOM due to the dataURI [limit varies](https://stackoverflow.com/questions/695151/data-protocol-url-size-limitations/41755526#41755526).

## Contributing

Please let us know how can we help. Do check out [issues](https://github.com/neerajcodes/capture-dom/issues) for bug reports or suggestions first.

To become a contributor, please follow our [contributing guide](/CONTRIBUTING.md).

<a href="https://github.com/neerajcodes/capture-dom/graphs/contributors">
  <img src="/CONTRIBUTORS.svg" alt="Contributors" width="740" />
</a>