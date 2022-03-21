//

// import screenshotStore from "../Context";
import uniqArray from './uniqarray';

/**
 * Getting All Current  style In Page
 * @param cssProperty
 *
 * styleInPage("color")
 * @returns
 */

const styleInPage = (cssProperty: string | any): Promise<string[]> => {
  const List = []
  for (const allNodes of document.querySelectorAll('*') as any) {
    for (const pseudo of ['', ':before', ':after']) {
      const getValue = getComputedStyle(allNodes, pseudo)[cssProperty];
      List.push(getValue);
    }
  }
  const filterDuplicate: string[] = uniqArray(List);
  return Promise.resolve(filterDuplicate);
};

export default styleInPage;

  // for (const allNodes of currentNode.querySelectorAll('*') as any) {
  //   for (const pseudo of ['', ':before', ':after']) {
  //     const getValue = getComputedStyle(allNodes, pseudo)[cssProperty]
  //     List.push(getValue);
  //   }
  // }

  // console.log("List", Array.from(new Set(List)));