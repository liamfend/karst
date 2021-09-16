import React, { ReactElement } from "react";
const dn = import("./dn");
interface IProps {
  trans?: string;
}
console.log(dn);
function Index({ trans }: IProps): ReactElement {
  return <div>this is {trans}</div>;
}

export default Index;
