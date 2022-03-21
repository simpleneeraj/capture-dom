
/**************************
 * #_Simple console.log()
***************************/
export const log = (message: any, isdebug?: boolean) => {
  return isdebug ? console.log(message, 'color:#48cfad;') : null;
};
/**************************
 * #_Simple console.debug()
***************************/
export const debug = (message: any, isdebug?: boolean) => {
  return isdebug ? console.debug(message) : null;
};
/**************************
 * #_Simple console.group()
***************************/
export const group = (message: any, isdebug?: boolean) => {
  return isdebug ? console.group(message) : null;
};
