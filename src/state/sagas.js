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

function* handleCanvasNavigationEvent({
  focusedWindowId: windowId,
  keyboardEventType,
}) {
  if (keyboardEventType === KeyboardEventTypes.NAVIGATE_TO_NEXT_CANVAS) {
    yield put(setNextCanvas(windowId));
    return;
  }

  if (keyboardEventType === KeyboardEventTypes.NAVIGATE_TO_PREVIOUS_CANVAS) {
    yield put(setPreviousCanvas(windowId));
    return;
  }

  let canvasIndex = 0;
  if (keyboardEventType === KeyboardEventTypes.NAVIGATE_TO_LAST_CANVAS) {
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
    const keyboardEventType = yield take(keyboardEventsChannel);
    const focusedWindowId = yield select(getFocusedWindowId);
    switch (keyboardEventType) {
      case KeyboardEventTypes.TOGGLE_FULLSCREEN:
        yield call(handleFullscreenEvent);
        break;
      default:
        yield call(handleCanvasNavigationEvent, {
          focusedWindowId,
          keyboardEventType,
        });
        break;
    }
  }
}

export default rootSaga;
