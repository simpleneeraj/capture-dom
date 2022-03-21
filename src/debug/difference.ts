/**************************
 * Calculation Performance Function
 * 
 * Inspired by html2canvas library
***************************/
const difference = (startTime: number, currentTime: number) => {
  const calc = currentTime - startTime;
  return `${calc}ms`;
};

export default difference;
