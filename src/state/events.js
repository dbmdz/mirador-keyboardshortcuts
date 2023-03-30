import hotkeys from "hotkeys-js";
import { eventChannel } from "redux-saga";

const KeyboardEventTypes = {
  NAVIGATE_TO_FIRST_CANVAS: "navigate-to-first-canvas",
  NAVIGATE_TO_LAST_CANVAS: "navigate-to-last-canvas",
  NAVIGATE_TO_NEXT_CANVAS: "navigate-to-next-canvas",
  NAVIGATE_TO_PREVIOUS_CANVAS: "navigate-to-previous-canvas",
  TOGGLE_FULLSCREEN: "toggle-fullscreen",
};

const createKeyboardEventsChannel = () =>
  eventChannel((emit) => {
    hotkeys("left", () => {
      emit(KeyboardEventTypes.NAVIGATE_TO_PREVIOUS_CANVAS);
    });
    hotkeys("ctrl+left", () => {
      emit(KeyboardEventTypes.NAVIGATE_TO_FIRST_CANVAS);
    });
    hotkeys("right,space", () => {
      emit(KeyboardEventTypes.NAVIGATE_TO_NEXT_CANVAS);
    });
    hotkeys("ctrl+right", () => {
      emit(KeyboardEventTypes.NAVIGATE_TO_LAST_CANVAS);
    });
    hotkeys("enter", () => {
      emit(KeyboardEventTypes.TOGGLE_FULLSCREEN);
    });
    return () => hotkeys.unbind();
  });

export { createKeyboardEventsChannel, KeyboardEventTypes };
