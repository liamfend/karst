#!/usr/bin/env node

import React, { ReactElement } from "react";

interface ITest {
  a?: string;
}

function test({ a }: ITest): ReactElement {
  return <div>{a}</div>;
}

export default test;
