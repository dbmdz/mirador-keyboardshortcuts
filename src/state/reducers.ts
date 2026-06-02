import type { FullScreenHandle } from "react-full-screen";

import { PluginAction, PluginActionType } from "./actions";

interface KeyboardShortcutsState {
  fullScreenHandle?: FullScreenHandle;
}

interface State {
  keyboardShortcuts?: KeyboardShortcutsState;
}

const keyboardShortcutsReducer = (
  state: KeyboardShortcutsState = {},
  action: PluginAction,
) => {
  switch (action.type) {
    case PluginActionType.STORE_FULLSCREEN_HANDLE:
      return {
        ...state,
        fullScreenHandle: action.handle,
      };
    default:
      return state;
  }
};

export { keyboardShortcutsReducer };
export type { State };
