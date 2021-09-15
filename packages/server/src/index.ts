let test = "aaa";

console.log(test);

type Person = {
  a: string;
  b?: number;
};
const person: Person = {
  a: "aaa",
};
console.log(person);
const m = test + "a";
test = "33";
console.log(m + test);
