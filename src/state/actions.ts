import { type FullScreenHandle } from "mirador";

enum PluginActionType {
  STORE_FULLSCREEN_HANDLE = "mirador-keyboardshortcuts/STORE_FULLSCREEN_HANDLE",
}

interface StoreFullScreenHandleAction {
  handle: FullScreenHandle;
  type: PluginActionType.STORE_FULLSCREEN_HANDLE;
}

type PluginAction = StoreFullScreenHandleAction;

/** Stores the fullscreen handle */
const storeFullScreenHandle = (
  handle: FullScreenHandle,
): StoreFullScreenHandleAction => ({
  handle,
  type: PluginActionType.STORE_FULLSCREEN_HANDLE,
});

export { PluginActionType, storeFullScreenHandle };
export type { PluginAction, StoreFullScreenHandleAction };
