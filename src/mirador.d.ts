declare module "mirador" {
  import { Selector } from "reselect";

  export function viewer(): void;

  export const ActionTypes: {
    IMPORT_CONFIG: string;
    [key: string]: string;
  };

  declare interface Config {
    keyboardShortcuts?: {
      shortcutMapping?: Record<string, string>;
    };
    [key: string]: any;
  }

  export const getAllowedWindowViewTypes: Selector<any, any, string[]>;

  export const getCanvases: Selector<any, any, any[]>;

  export const getCanvasGroupings: Selector<any, any, any[]>;

  export const getConfig: Selector<any, Config, any>;

  export const getFullScreenEnabled: Selector<boolean, any, any>;

  export const getFocusedWindowId: Selector<any, string, any>;

  export const getManifestUrl: Selector<any, string, any>;

  export const getWindowViewType: Selector<any, any, any>;

  export function setCanvas(): any;

  export function setNextCanvas(): any;

  export function setPreviousCanvas(): any;

  export function setWindowViewType(): any;
}
