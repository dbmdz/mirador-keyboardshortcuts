import {
  setCanvas,
  setNextCanvas,
  setPreviousCanvas,
  setWorkspaceFullscreen,
} from "mirador/dist/es/src/state/actions";
import {
  getCanvases,
  getCanvasGroupings,
  getFullScreenEnabled,
  getWindowViewType,
} from "mirador/dist/es/src/state/selectors";
import { call, put, select, take } from "redux-saga/effects";

import { createKeyboardEventsChannel, KeyboardEventTypes } from "./events";
import { getFocusedWindowId } from "./selectors";

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

function* handleFullscreenEvent() {
  const isFullscreenEnabled = yield select(getFullScreenEnabled);
  yield put(setWorkspaceFullscreen(!isFullscreenEnabled));
}

function* rootSaga() {
  const keyboardEventsChannel = yield call(createKeyboardEventsChannel);
  while (true) {
    const eventType = yield take(keyboardEventsChannel);
    const windowId = yield select(getFocusedWindowId);
    switch (eventType) {
      case KeyboardEventTypes.TOGGLE_FULLSCREEN:
        yield call(handleFullscreenEvent);
        break;
      case KeyboardEventTypes.NAVIGATE_TO_FIRST_CANVAS:
      case KeyboardEventTypes.NAVIGATE_TO_LAST_CANVAS:
      case KeyboardEventTypes.NAVIGATE_TO_NEXT_CANVAS:
      case KeyboardEventTypes.NAVIGATE_TO_PREVIOUS_CANVAS:
        yield call(handleCanvasNavigationEvent, {
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

export default rootSaga;
