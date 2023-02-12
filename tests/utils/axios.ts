const sleep = async (time: number, result: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result);
    }, time);
  });
};

const loopSleep = async (time: number, result: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result);
      setTimeout(() => {
        loopSleep(time, result);
      }, time);
    }, time);
  });
};

export { sleep, loopSleep };
