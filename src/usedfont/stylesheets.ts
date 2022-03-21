import toArray from '../utils/toarray';
import getCSSRules from './cssrules';

const GetStyleSheets = async <T extends HTMLElement>(node: T): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    const styleSheets: CSSStyleSheet[] = await new Promise(
      (resolve, reject) => {
        if (node.ownerDocument == null) {
          reject(new Error('Document is Null'));
        }
        resolve(toArray(node.ownerDocument.styleSheets));
      }
    );
    const CSSRules = await getCSSRules(styleSheets);
    resolve(CSSRules);
    if (!CSSRules) {
      reject(console.log('Error in Getting Style node Sheets '));
    }
  });
};

export default GetStyleSheets;
