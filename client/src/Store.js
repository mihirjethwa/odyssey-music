import { createStore } from "redux";
import thunk from "redux-thunk";
//import {composeWithDevTools} from "redux-devtools-extension";
import { applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";

//const Store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const Store = createStore(rootReducer, applyMiddleware(thunk));

export default Store;
