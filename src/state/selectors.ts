import { getWindowConfig } from "mirador";
import { createSelector } from "reselect";

const getFocusedWindowId= createSelector(
    [getWindowConfig],
    (windowConfig) => { return windowConfig.focusedWindowId; }
);

/** Selector to get the plugin config for a given window */
const getPluginConfig = createSelector(
  [getWindowConfig],
  (windowConfig) => { return windowConfig.keyboardShortcuts ?? {} }
);

export { getFocusedWindowId, getPluginConfig };
