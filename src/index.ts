import type { FullScreenHandle } from "react-full-screen";

import FullScreenHandle2Store from "./components/FullScreenHandle2Store";
import { PluginAction, storeFullScreenHandle } from "./state/actions";
import { KeyboardEventTypes } from "./state/events";
import { keyboardShortcutsReducer } from "./state/reducers";
import keyboardShortcutsSaga from "./state/sagas";

export default [
  {
    component: FullScreenHandle2Store,
    mapDispatchToProps: (dispatch: (action: PluginAction) => PluginAction) => ({
      storeFullScreenHandle: (handle: FullScreenHandle) =>
        dispatch(storeFullScreenHandle(handle)),
    }),
    mode: "add",
    reducers: {
      keyboardShortcuts: keyboardShortcutsReducer,
    },
    saga: keyboardShortcutsSaga,
    target: "BackgroundPluginArea",
  },
];

export { KeyboardEventTypes };
