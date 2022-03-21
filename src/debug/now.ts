/**************************
 * #_Simple Calc
 * let isDev=process.env.NODE_ENV==='development'
***************************/
export const now = () => {
  return performance.now();
};

export default now;
