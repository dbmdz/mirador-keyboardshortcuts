import hotkeys from "hotkeys-js";
import { eventChannel } from "redux-saga";

const KeyboardEventTypes = {
  NAVIGATE_TO_FIRST_CANVAS: "navigate-to-first-canvas",
  NAVIGATE_TO_LAST_CANVAS: "navigate-to-last-canvas",
  NAVIGATE_TO_NEXT_CANVAS: "navigate-to-next-canvas",
  NAVIGATE_TO_PREVIOUS_CANVAS: "navigate-to-previous-canvas",
  TOGGLE_FULLSCREEN: "toggle-fullscreen",
};

/** This mapping must always have the same keys as defined in KeyboardEventTypes! */
const keyMapping = {
  [KeyboardEventTypes.NAVIGATE_TO_FIRST_CANVAS]: "ctrl+left",
  [KeyboardEventTypes.NAVIGATE_TO_LAST_CANVAS]: "ctrl+right",
  [KeyboardEventTypes.NAVIGATE_TO_NEXT_CANVAS]: "right,space",
  [KeyboardEventTypes.NAVIGATE_TO_PREVIOUS_CANVAS]: "left",
  [KeyboardEventTypes.TOGGLE_FULLSCREEN]: "enter",
};

const createKeyboardEventsChannel = () =>
  eventChannel((emit) => {
    Object.values(KeyboardEventTypes).forEach((eventType) => {
      const key = keyMapping[eventType];
      if (!key) {
        // eslint-disable-next-line no-console
        console.warn(
          `No key for event type ${eventType} was found in the mapping.`
        );
        return;
      }
      hotkeys(key, () => {
        emit(eventType);
      });
    });
    return () => hotkeys.unbind();
  });

export { createKeyboardEventsChannel, KeyboardEventTypes };
