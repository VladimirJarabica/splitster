import React from "react";

const App = ({ initialComponent, reduxState }) => (
  <html>
    <head>
      <title>server rendering</title>
    </head>
    <body data-redux-state={JSON.stringify(reduxState)}>
      <div
        id="app"
        dangerouslySetInnerHTML={{
          __html: initialComponent
        }}
      />
      <script src="/bundle.js" />
    </body>
  </html>
);

export default App;
