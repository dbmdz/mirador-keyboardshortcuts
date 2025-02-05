import {
  setCanvas,
  setNextCanvas,
  setPreviousCanvas,
  setWindowViewType,
} from "mirador/dist/es/src/state/actions";
import ActionTypes from "mirador/dist/es/src/state/actions/action-types";
import {
  getAllowedWindowViewTypes,
  getCanvases,
  getCanvasGroupings,
  getManifestUrl,
  getWindowViewType,
} from "mirador/dist/es/src/state/selectors";
import { call, put, select, take, takeEvery } from "redux-saga/effects";

import { createKeyboardEventsChannel, KeyboardEventTypes } from "./events";
import { getFocusedWindowId, getPluginConfig } from "./selectors";

/**  */
function* handleCanvasNavigationEvent({ eventType, windowId }) {
  if (eventType === KeyboardEventTypes.NAVIGATE_TO_NEXT_CANVAS) {
    yield put(setNextCanvas(windowId));
    return;
  }

  if (eventType === KeyboardEventTypes.NAVIGATE_TO_PREVIOUS_CANVAS) {
    yield put(setPreviousCanvas(windowId));
    return;
  }

  let canvasIndex = 0;
  if (eventType === KeyboardEventTypes.NAVIGATE_TO_LAST_CANVAS) {
    const canvases = yield select(getCanvases, { windowId });
    canvasIndex = canvases.length - 1;
  }

  const allGroupings = yield select(getCanvasGroupings, { windowId });
  const viewType = yield select(getWindowViewType, { windowId });
  const groupIndex =
    viewType === "book" ? Math.ceil(canvasIndex / 2) : canvasIndex;
  const newGroup = allGroupings?.[groupIndex];
  const ids = (newGroup || []).map((c) => c.id);
  if (newGroup) {
    yield put(setCanvas(windowId, ids[0], ids));
  }
}

/**  */
function* handleViewTypeEvent({ eventType, windowId }) {
  const manifestId = yield select(getManifestUrl, { windowId });
  const allowedWindowViewTypes = yield select(getAllowedWindowViewTypes, {
    manifestId,
  });
  switch (eventType) {
    case KeyboardEventTypes.SWITCH_TO_BOOK_VIEW:
      if (allowedWindowViewTypes.includes("book")) {
        yield put(setWindowViewType(windowId, "book"));
      }
      break;
    case KeyboardEventTypes.SWITCH_TO_GALLERY_VIEW:
      if (allowedWindowViewTypes.includes("gallery")) {
        yield put(setWindowViewType(windowId, "gallery"));
      }
      break;
    case KeyboardEventTypes.SWITCH_TO_SINGLE_VIEW:
      if (allowedWindowViewTypes.includes("single")) {
        yield put(setWindowViewType(windowId, "single"));
      }
      break;
    default:
      // eslint-disable-next-line no-console
      console.warn(`No handler for event type ${eventType} was found.`);
      break;
  }
}
/**  */
function* initialise() {
  const { shortcutMapping } = yield select(getPluginConfig);
  const keyboardEventsChannel = yield call(
    createKeyboardEventsChannel,
    shortcutMapping,
  );
  while (true) {
    const eventType = yield take(keyboardEventsChannel);
    const windowId = yield select(getFocusedWindowId);
    switch (eventType) {
      case KeyboardEventTypes.NAVIGATE_TO_FIRST_CANVAS:
      case KeyboardEventTypes.NAVIGATE_TO_LAST_CANVAS:
      case KeyboardEventTypes.NAVIGATE_TO_NEXT_CANVAS:
      case KeyboardEventTypes.NAVIGATE_TO_PREVIOUS_CANVAS:
        yield call(handleCanvasNavigationEvent, {
          eventType,
          windowId,
        });
        break;
      case KeyboardEventTypes.SWITCH_TO_BOOK_VIEW:
      case KeyboardEventTypes.SWITCH_TO_GALLERY_VIEW:
      case KeyboardEventTypes.SWITCH_TO_SINGLE_VIEW:
        yield call(handleViewTypeEvent, {
          eventType,
          windowId,
        });
        break;
      default:
        // eslint-disable-next-line no-console
        console.warn(`No handler for event type ${eventType} was found.`);
        break;
    }
  }
}
/**  */
function* rootSaga() {
  yield takeEvery(ActionTypes.IMPORT_CONFIG, initialise);
}

export default rootSaga;
