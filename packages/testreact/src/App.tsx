import React, { ReactElement } from "react";

interface IProps {
  name?: string;
}

function App({ name }: IProps): ReactElement {
  return <div>hello:{name}</div>;
}

export default App;
