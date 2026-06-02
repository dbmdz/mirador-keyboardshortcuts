import {
  ActionTypes,
  getAllowedWindowViewTypes,
  getCanvases,
  getCanvasGroupings,
  getConfig,
  getFocusedWindowId,
  getManifestUrl,
  getWindowViewType,
  setCanvas,
  setNextCanvas,
  setPreviousCanvas,
  setWindowViewType,
} from "mirador";
import type { FullScreenHandle } from "react-full-screen";
import { call, put, select, take, takeEvery } from "redux-saga/effects";

import {
  createKeyboardEventsChannel,
  EventType,
  KeyboardEventTypes,
} from "./events";
import { getFullScreenHandle } from "./selectors";

function* handleCanvasNavigationEvent({
  eventType,
  windowId,
}: {
  eventType: EventType;
  windowId: string;
}): Generator<any, void, any> {
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
  const ids = (newGroup ?? []).map((c: any) => c.id);
  if (newGroup) {
    yield put(setCanvas(windowId, ids[0], ids));
  }
}

function* handleFullscreenEvent() {
  const { active, enter, exit }: FullScreenHandle =
    yield select(getFullScreenHandle);
  if (active) {
    void exit();
  } else {
    void enter();
  }
}

function* handleViewTypeEvent({
  eventType,
  windowId,
}: {
  eventType: EventType;
  windowId: string;
}): Generator<any, void, any> {
  const manifestId: string = yield select(getManifestUrl, { windowId });
  const allowedWindowViewTypes: string[] = yield select(
    getAllowedWindowViewTypes as any,
    {
      manifestId,
    },
  );
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
      console.warn(`No handler for event type ${eventType} was found.`);
      break;
  }
}

function* initialise(): Generator<any, void, any> {
  const config = yield select(getConfig);
  const { shortcutMapping } = config?.keyboardShortcuts ?? {};
  const keyboardEventsChannel = yield call(
    createKeyboardEventsChannel,
    shortcutMapping,
  );
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
      case KeyboardEventTypes.SWITCH_TO_BOOK_VIEW:
      case KeyboardEventTypes.SWITCH_TO_GALLERY_VIEW:
      case KeyboardEventTypes.SWITCH_TO_SINGLE_VIEW:
        yield call(handleViewTypeEvent, {
          eventType,
          windowId,
        });
        break;
      default:
        console.warn(`No handler for event type ${eventType} was found.`);
        break;
    }
  }
}

function* rootSaga() {
  yield takeEvery(ActionTypes.IMPORT_CONFIG, initialise);
}

export default rootSaga;
