let FINAL_PROCESS: NodeJS.Process;
function getPixelRatio() {
  let ratio: number | any;
  try {
    FINAL_PROCESS = process;
  } catch (e) {
    // pass
  }
  const val =
    FINAL_PROCESS && FINAL_PROCESS.env
      ? FINAL_PROCESS.env.devicePixelRatio
      : null;
  if (val) {
    ratio = parseInt(val, 10);
    if (Number.isNaN(ratio)) {
      ratio = 1;
    }
  }
  return ratio || window.devicePixelRatio || 1;
}

export default getPixelRatio;
