import Base64Reader from './filereader';
import { regexUrl } from '../utils/regex';
import GetStyleSheets from './stylesheets';
import styleInPage from '../utils/styleinpage';

// Main Function
const inPageUsedFont = async <T extends HTMLElement>(
  node: T,
  clonedNode: T
): Promise<T> => {
  const CSSRules = await GetStyleSheets(node);
  // In Page Fonts Family
  const inUseFonts = await styleInPage('fontFamily');
  // Default Empty Array
  const AllFonts: { fontFamily: string; source: string | null; }[] = []
  const filterFontsArr: string[] = []

  // Checking Rules
  const checkRules = CSSRules.filter(
    (rule: { type: number }) => rule.type === CSSRule.FONT_FACE_RULE
  );

  // Again Filter and Get data object
  checkRules.filter((rule: CSSStyleRule) => {
    const checkSource = rule.style.getPropertyValue('src');
    const source = checkSource ? checkSource : null;
    const fontFamily = rule.style.getPropertyValue('font-family');
    return (
      AllFonts.push({
        fontFamily: fontFamily,
        source: source,
      })
    )
  });

  // Filter All Fonts and Find available fonts
  const FilterArr = AllFonts.filter(item =>
    inUseFonts.find(str => item.fontFamily.includes(str))
  );

  // Map and fetch available fonts
  const TaskFonts = inUseFonts.map(async (_, i) => {
    // Get Font Family
    const source = FilterArr[i]?.source;
    if (!source) {
      return
    }
    const fontFamily = FilterArr[i]?.fontFamily;
    // Checking if font source or font family have nothing then return null
    const condition =
      typeof source !== 'undefined' || typeof fontFamily !== 'undefined';
    if (condition) {
      // Filter Url
      let url = source.replace(regexUrl, '$1');
      if (!url.startsWith('https://')) {
        url = new URL(url, window.location.href).href;
      }
      // Fetch availble fonts
      const res = await window.fetch(url);
      const blob = await res.blob();
      return new Promise(async resolve => {
        // Read fonts as base64
        const result = await Base64Reader(blob);
        // Making css raw
        const rawText = `@font-face {font-family: ${fontFamily};src: url("${result}");}`;
        // push data to array
        filterFontsArr.push(rawText);
        // filter duplicate
        const DuplicateRemoved = new Set(filterFontsArr);
        const newArray = Array.from(DuplicateRemoved);
        let cssText = newArray.join('\n')
        // Adding Fonts CSS to stylesheet of node
        const styleNode = document.createElement('style');
        const textNode = document.createTextNode(cssText);
        if (clonedNode.firstChild) {
          clonedNode.insertBefore(styleNode, clonedNode.firstChild);
        } else {
          clonedNode.append(styleNode);
        }
        styleNode.append(textNode);
        resolve(result);
      });
    }
  });

  // Return cloneNode with Promise
  return await Promise.all(TaskFonts).then(() => {
    return clonedNode;
  });
};

export default inPageUsedFont;
