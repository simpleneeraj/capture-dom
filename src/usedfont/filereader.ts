// REad File as BAse 64
const Base64Reader = (file: Blob): Promise<string | ArrayBuffer | any> => {
  return new Promise(async (resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
  });
};

export default Base64Reader;
