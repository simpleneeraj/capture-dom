import toArray from '../utils/toarray';
import fetchCSS from './fetchCSS';
import parseCSS from './parsecss';

async function getCSSRules(
  styleSheets: CSSStyleSheet[]
): Promise<CSSStyleRule[]> {
  const ret: CSSStyleRule[] = [];
  const deferreds: Promise<number | void>[] = [];
  // First loop inlines imports
  styleSheets.forEach(sheet => {
    if ('cssRules' in sheet) {
      const emptyString: any = '';
      try {
        toArray<CSSRule>(sheet.cssRules).forEach(
          (item: CSSRule, index: number) => {
            if (item.type === CSSRule.IMPORT_RULE) {
              let importIndex = index + 1;
              const url = (item as CSSImportRule).href;
              const deferred = fetchCSS(url)
                .then(metadata => metadata && emptyString)
                .then(cssText => parseCSS(cssText).forEach(rule => {
                  try {
                    sheet.insertRule(
                      rule,
                      rule.startsWith('@import')
                        ? (importIndex += 1)
                        : sheet.cssRules.length
                    );
                  } catch (error) {
                    console.error('Error inserting rule from remote css', {
                      rule,
                      error,
                    });
                  }
                }
                )
                )
                .catch(e => {
                  console.error('Error loading remote css', e.toString());
                });

              deferreds.push(deferred);
            }
          }
        );
      } catch (e) {
        const inline =
          styleSheets.find(a => a.href == null) || document.styleSheets[0];
        if (sheet.href != null) {
          deferreds.push(
            fetchCSS(sheet.href)
              .then(metadata => metadata && emptyString)
              .then(cssText =>
                parseCSS(cssText).forEach(rule => {
                  inline.insertRule(rule, sheet.cssRules.length);
                })
              )
              .catch(err => {
                console.error(
                  'Error loading remote stylesheet',
                  err.toString()
                );
              })
          );
        }
        console.error('Error inlining remote css file');
      }
    }
  });

  return Promise.all(deferreds).then(() => {
    // Second loop parses rules
    styleSheets.forEach(sheet => {
      if ('cssRules' in sheet) {
        try {
          toArray<CSSStyleRule>(sheet.cssRules).forEach(
            (item: CSSStyleRule) => {
              ret.push(item);
            }
          );
        } catch (e) {
          console.error(
            `Error while reading CSS rules from ${sheet.href}`,
          );
        }
      }
    });

    return ret;
  });
}

export default getCSSRules;
