import { getWorkspace } from "mirador/dist/es/src/state/selectors";
import { createSelector } from "reselect";

/* FIXME: remove this when Mirador exports this selector
   see https://github.com/ProjectMirador/mirador/blob/v3.3.0/src/state/selectors/workspace.js#L29-L32 */
const getFocusedWindowId = createSelector(
  [getWorkspace],
  ({ focusedWindowId }) => focusedWindowId
);

export { getFocusedWindowId };
