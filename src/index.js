import { getConfig } from "mirador/dist/es/src/state/selectors";

import Workspace from "./components/Workspace";
import { KeyboardEventTypes } from "./state/events";
import keyboardShortcutsSaga from "./state/sagas";

export default [
  {
    saga: keyboardShortcutsSaga,
    target: "Workspace",
    mode: "wrap",
    component: Workspace,
    mapStateToProps: (state) => ({
      keyboardShortcuts: getConfig(state).keyboardShortcuts,
    }),
  },
];

export { KeyboardEventTypes };
