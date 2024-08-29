import hotkeys from 'hotkeys-js';
import { eventChannel } from 'redux-saga';

const KeyboardEventTypes = {
  NAVIGATE_TO_FIRST_CANVAS: 'navigate-to-first-canvas',
  NAVIGATE_TO_LAST_CANVAS: 'navigate-to-last-canvas',
  NAVIGATE_TO_NEXT_CANVAS: 'navigate-to-next-canvas',
  NAVIGATE_TO_PREVIOUS_CANVAS: 'navigate-to-previous-canvas',
  SWITCH_TO_BOOK_VIEW: 'switch-to-book-view',
  SWITCH_TO_GALLERY_VIEW: 'switch-to-gallery-view',
  SWITCH_TO_SINGLE_VIEW: 'switch-to-single-view',
  TOGGLE_FULLSCREEN: 'toggle-fullscreen',
};

/** This mapping must always have the same keys as defined in KeyboardEventTypes! */
const defaultShortcutMapping = {
  [KeyboardEventTypes.NAVIGATE_TO_FIRST_CANVAS]: 'ctrl+left',
  [KeyboardEventTypes.NAVIGATE_TO_LAST_CANVAS]: 'ctrl+right',
  [KeyboardEventTypes.NAVIGATE_TO_NEXT_CANVAS]: 'right,space',
  [KeyboardEventTypes.NAVIGATE_TO_PREVIOUS_CANVAS]: 'left',
  [KeyboardEventTypes.SWITCH_TO_BOOK_VIEW]: 'b',
  [KeyboardEventTypes.SWITCH_TO_GALLERY_VIEW]: 'g',
  [KeyboardEventTypes.SWITCH_TO_SINGLE_VIEW]: 's',
  [KeyboardEventTypes.TOGGLE_FULLSCREEN]: 'enter,f',
};

/**  */
const createKeyboardEventsChannel = (shortcutMapping = {}) =>
  eventChannel((emit) => {
    Object.values(KeyboardEventTypes).forEach((eventType) => {
      const shortcut = shortcutMapping[eventType] ?? defaultShortcutMapping[eventType];
      hotkeys(shortcut, (evt) => {
        evt.preventDefault();
        emit(eventType);
      });
    });
    return () => hotkeys.unbind();
  });

export { createKeyboardEventsChannel, KeyboardEventTypes, defaultShortcutMapping };
