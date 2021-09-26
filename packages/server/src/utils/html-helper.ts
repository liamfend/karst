export const builder = () => {
  return {
    a: 23432,
  };
};
builder.ccc = (): string => {
  return "cc";
};
builder.geta = (): string => {
  const a = builder.ccc();
  return "aaaa" + a;
};

const test = builder.geta();
