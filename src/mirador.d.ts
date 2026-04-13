declare module "mirador" {
  import { Selector } from "reselect";

  export function viewer(
    config: Record<string, unknown>,
    plugins?: unknown[],
  ): void;

  export const getWindowConfig: Selector<Record<string, unknown>>;
}  

declare module "mirador/src" {
  import { Selector } from "reselect";

  export const ActionTypes: {
    IMPORT_CONFIG: string;
    [key: string]: string;
  };

  export const getAllowedWindowViewTypes: Selector<any, any, string[]>;

  export const getCanvases: Selector<any, any, any[]>;

  export const getCanvasGroupings: Selector<any, any, any[]>;

  export const getFullScreenEnabled: Selector<any, any, string>;

  export const getManifestUrl: Selector<any, any, string>;

  export const getWindowViewType: Selector<any, any, string>;

  export function setCanvas(
    windowId: string,
    canvasId: string,
    visibleCanvases?: string[],
    options?: Record<string, unknown>
  ): any;

  export function setNextCanvas(
    windowId: string
  ): any;

  export function setPreviousCanvas(
    windowId: string
  ): any;

  export function setWindowViewType(
    windowId: string,
    viewType: string
  ): any;

  /* seems not to exist
  export function setWorkspaceFullscreen(
    isFullscreenEnabled: boolean
  ): any;
  */
}

