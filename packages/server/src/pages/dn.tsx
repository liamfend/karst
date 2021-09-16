import React, { ReactElement } from "react";

interface IDn {
  test?: string;
}

function Dn({ test }: IDn): ReactElement {
  return <div>dn{test}</div>;
}

export default Dn;
