import React, { ReactElement } from "react";

const TestComponent = React.lazy(() => import("./test"));
interface IProps {
  test: string;
}

const index = ({ test }: IProps): ReactElement => {
  return (
    <div>
      <TestComponent a="aa" />{" "}
    </div>
  );
};

export default index;
