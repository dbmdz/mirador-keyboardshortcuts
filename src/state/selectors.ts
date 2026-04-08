import { getWindowConfig } from "mirador";
import { createSelector } from "reselect";

const getFocusedWindowId= createSelector(
    [getWindowConfig],
    ({ focusedWindowId }) => focusedWindowId,
);

/** Selector to get the plugin config for a given window */
const getPluginConfig = createSelector(
  [getWindowConfig],
  ({ keyboardShortcuts = {} }) => keyboardShortcuts,
);

export { getFocusedWindowId, getPluginConfig };
