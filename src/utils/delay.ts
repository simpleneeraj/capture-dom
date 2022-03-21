const delay =
  <T>(ms: number) =>
    (args: T) => {
      return new Promise<T>(resolve => setTimeout(() => resolve(args), ms));
    };

export default delay;
