import React, { ReactElement } from "react";

interface IProps {
  test: string;
}

function index({ test }: IProps): ReactElement {
  return <div>dsafda{test}</div>;
}

export default index;
