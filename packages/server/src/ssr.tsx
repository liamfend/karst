import React from "react";
import Index from "./pages";
import ReactDOMServer from "react-dom/server";

export default ReactDOMServer.renderToString(<Index />);
