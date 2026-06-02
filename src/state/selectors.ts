import { miradorSlice } from "mirador";
import type { FullScreenHandle } from "react-full-screen";

import { State } from "./reducers";

/** Selector to get the currently open month */
const getFullScreenHandle = (state: State): FullScreenHandle | undefined =>
  miradorSlice(state).keyboardShortcuts?.fullScreenHandle;

export { getFullScreenHandle };
