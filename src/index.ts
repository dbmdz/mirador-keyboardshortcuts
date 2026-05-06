import { KeyboardEventTypes } from "./state/events";
import keyboardShortcutsSaga from "./state/sagas";

export default [
  {
    saga: keyboardShortcutsSaga,
  },
];

export { KeyboardEventTypes };
