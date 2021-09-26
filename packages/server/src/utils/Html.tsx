import React, { ReactElement } from "react";

interface IHtml {
  lang?: string;
  metas?: Array<React.MetaHTMLAttributes<HTMLMetaElement>>;
  links?: Array<React.LinkHTMLAttributes<HTMLLinkElement>>;
  scripts?: Array<React.ScriptHTMLAttributes<HTMLScriptElement>>;
  title?: string;
}

export default function Html({
  lang,
  metas,
  links,
  scripts,
  title,
}: IHtml): ReactElement {
  return (
    <html lang={lang}>
      <head>
        {metas}
        {links}
        {scripts}
        <title>{title}</title>
      </head>
      <body></body>
    </html>
  );
}
