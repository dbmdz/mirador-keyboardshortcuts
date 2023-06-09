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
const defaultShortcutMapping = {
  [KeyboardEventTypes.NAVIGATE_TO_FIRST_CANVAS]: "ctrl+left",
  [KeyboardEventTypes.NAVIGATE_TO_LAST_CANVAS]: "ctrl+right",
  [KeyboardEventTypes.NAVIGATE_TO_NEXT_CANVAS]: "right,space",
  [KeyboardEventTypes.NAVIGATE_TO_PREVIOUS_CANVAS]: "left",
  [KeyboardEventTypes.TOGGLE_FULLSCREEN]: "enter",
};

const createKeyboardEventsChannel = (shortcutMapping = {}) =>
  eventChannel((emit) => {
    Object.values(KeyboardEventTypes).forEach((eventType) => {
      const shortcut =
        shortcutMapping[eventType] ?? defaultShortcutMapping[eventType];
      hotkeys(shortcut, (evt) => {
        evt.preventDefault();
        emit(eventType);
      });
    });
    return () => hotkeys.unbind();
  });

export { createKeyboardEventsChannel, KeyboardEventTypes };
