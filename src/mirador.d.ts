declare module "mirador" {
  export function viewer(
    config: Record<string, unknown>,
    plugins?: unknown[],
  ): void;

  export const getWindowConfig: import("reselect").Selector<
    Record<string, unknown>
  >;
}  

declare module "mirador/selectors" {
  export function getAllowedWindowViewTypes(any): [];

  export function getCanvases(): any

  export function getCanvasGroupings(
    manifestId: string,
    windowId: string
  ): []

  export function getFullScreenEnabled(): boolean

  export function getManifestUrl(); string

  export function getWindowViewType(
    manifestId: string,
    windowId: string
  ): string
}

declare module "mirador/actions" {
  export function setCanvas(
    windowId: string,
    canvasId: string
  ): function(dispatch, getState);

  export function setNextCanvas(
    windowId: string
  ): function(dispatch, getState);

  export function setPreviousCanvas(
    windowId: string
  ): function(dispatch, getState);

  export function setWindowViewType(
    windowId: string,
    viewType: any
  ): ActionCreators;

  export function setWorkspaceFullscreen(
    isFullscreenEnabled: boolean
  ): string;
}

declare module "mirador/actions/action-types" {
  export const IMPORT_CONFIG: string;
}