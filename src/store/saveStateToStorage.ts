import { State } from "./reducers";

const saveStateToStorage = (state: State) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (err) {
    alert("saving has failed");
  }
};

export default saveStateToStorage;
