import { type FullScreenHandle, miradorSlice } from "mirador";

import { State } from "./reducers";

/** Selector to get the currently open month */
const getFullScreenHandle = (state: State): FullScreenHandle | undefined =>
  miradorSlice(state).keyboardShortcuts?.fullScreenHandle;

export { getFullScreenHandle };
