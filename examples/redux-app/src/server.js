import express from "express";
import path from "path";
import cookieParser from "cookie-parser";

import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { renderToStaticMarkup, renderToString } from "react-dom/server";

import * as splitsterRedux from "splitster-redux";

import reducers from "./store/reducers";

import { parseCookies } from "../../../src/main";
import config from "./config";

import App from "./App";
import Root from "./app/Root";

const app = express();

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "./../dist")));

app.get("/", (req, res) => {
  // TODO: add splitster reducer
  const store = createStore(reducers);

  const def = parseCookies(req.cookies);
  console.log("parsed cookies", def);
  store.dispatch(splitsterRedux.initServer(config, null, def));
  store.dispatch(splitsterRedux.run());
  const initialComponent = renderToString(
    <Provider store={store}>
      <Root />
    </Provider>
  );

  // TODO: store.dispatch(serverToSave())
  store.dispatch(splitsterRedux.serverToSave());
  const reduxState = store.getState();

  const html = renderToStaticMarkup(
    <App initialComponent={initialComponent} reduxState={reduxState} />
  );

  res.send(html);
});

const port = 4000;

app.listen(port, () => {
  console.log("App listen on port", port);
});
