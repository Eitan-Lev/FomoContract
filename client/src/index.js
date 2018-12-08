import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import registerServiceWorker from "./registerServiceWorker";
import * as serviceWorker from './serviceWorker';


// import drizzle functions and contract artifact
import { Drizzle, generateStore } from "drizzle";
// import MyStringStore from "./contracts/FomoNoCallback.json";
import drizzleOptions from "./drizzleOptions";

// let drizzle know what contracts we want
// const options = { contracts: [MyStringStore] };
const options = drizzleOptions;

// setup the drizzle store and drizzle
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

// pass in the drizzle instance
ReactDOM.render(<App drizzle={drizzle} />, document.getElementById("root"));
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.register();
