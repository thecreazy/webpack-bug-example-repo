import "@babel/polyfill/noConflict";
import "./extras";
import "./polyfills";
console.log("ciao");
// import React from "react";
// import { Router } from "react-router-dom";
// import { hydrate } from "react-dom";
// import createStore from "module-harbour/redux/helpers/store";
// import { parseJSON } from "module-helpers/json.helper";
// import { initClientNavigation } from "module-helpers/navigation.helper";
// import ProviderWithRouter from "./shared/routing/ProviderWithRouter";
// import logger from "./client/logger";

// const INITIAL_STATE = parseJSON(window.__INITIAL_STATE__);
// const { store = {}, history = {} } = createStore(INITIAL_STATE);

// logger(INITIAL_STATE.getInPath(["config", "debug"]));

// initClientNavigation();

// const pageLoaded = () => {
//   window.removeEventListener("load", pageLoaded);
//   hydrate(
//     <Router history={history}>
//       <ProviderWithRouter store={store} />
//     </Router>,
//     document.getElementById("amse-app")
//   );
// };

// window.addEventListener("load", pageLoaded);
