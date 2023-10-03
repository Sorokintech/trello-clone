import { combineReducers } from "redux";
import subTaskReducer from "./subtask";
import currentTaskReducer from "./taskedit";

const reducers = combineReducers({
  subtask: subTaskReducer,
  currentTask: currentTaskReducer,
});
export default reducers;

export type State = ReturnType<typeof reducers>;
