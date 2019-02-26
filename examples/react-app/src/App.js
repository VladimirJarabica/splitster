import React from "react";

import Root from "./app/Root";
import { renderToString } from "react-dom/server";

const App = ({ splitster }) => (
  <html>
    <head>
      <title>server rendering</title>
    </head>
    <body data-splitster={JSON.stringify(splitster.getSaveResults())}>
      <div
        id="app"
        dangerouslySetInnerHTML={{
          __html: renderToString(<Root splitster={splitster} />)
        }}
      />
      <script src="/bundle.js" />
    </body>
  </html>
);

export default App;
