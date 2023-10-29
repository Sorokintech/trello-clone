import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";
import thunk from "redux-thunk";

const serializedState = localStorage.getItem("reduxState");
let initialState;
if (serializedState) {
  initialState = JSON.parse(serializedState);
}

export const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
