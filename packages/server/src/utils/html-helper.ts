export const builder = () => {
  return {
    a: 23432,
  };
};
builder.geta = (): string => {
  return "aaaa";
};

const test = builder.geta();
