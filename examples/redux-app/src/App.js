import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'

import Root from './app/Root'

const App = ({ store }) =>
  <html>
    <head>
      <title>server rendering</title>
    </head>
    <body data-redux-state={JSON.stringify(store.getState())}>
      <div
        id="app"
        dangerouslySetInnerHTML={{
          __html: renderToString(
            <Provider store={store}>
              <Root />
            </Provider>,
          ),
        }}
      />
      <script src="/bundle.js" />
    </body>
  </html>

export default App
