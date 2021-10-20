const start = async (): Promise<void> => {
  console.log("a");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("aaaaaaaa");
    }, 20000);
  });
};

export default start;
