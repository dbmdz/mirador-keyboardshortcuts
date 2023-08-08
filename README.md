# mirador-keyboardshortcuts

[![npm package][npm-badge]][npm]
[![required Mirador version][mirador-badge]][mirador]

A Mirador 3 plugin which adds keyboard shortcuts for the following events:

- scroll to the first canvas (default shortcut: `ctrl+left`)
- scroll to the previous canvas (default shortcut: `left`)
- scroll to the next canvas (default shortcuts: `right`, `space`)
- scroll to the last canvas (default shortcut: `ctrl+right`)
- switch to book view (default shortcut: `b`)
- switch to gallery view (default shortcut: `g`)
- switch to single view (default shortcut: `s`)
- toggle fullscreen mode (default shortcuts: `enter`, `f`)

*Note:* the events will only apply to the currently focussed window.

## Installation

Currently the plugin can only be used if you build your own Mirador JavaScript bundle.
To include the plugin in your Mirador installation, you need to install it
from npm with `npm install mirador-keyboardshortcuts`, import it into your project
and pass it to Mirador when you instantiate the viewer:

```javascript
import Mirador from 'mirador/dist/es/src/index';
import keyboardShortcutsPlugin from 'mirador-keyboardshortcuts/es';

const miradorConfig = {
  // Your Mirador configuration
}
Mirador.viewer(config, [...keyboardShortcutsPlugin]);
```

## Configuration

You can configure the plugin globally by adding the `keyboardShortcuts` entry to
the top-level configuration:

```javascript
const miradorConfig = {
  // ...
  keyboardShortcuts: {
    // Global config, see available settings below
    shortcutMapping: {
      "navigate-to-first-canvas": "home",
      "toggle-fullscreen": "f",
    },
  },
  // ...
}
```

You can view an example configuration in [demo/src/index.js][demo-cfg].

### Available settings

#### `shortcutMapping`

This is an override for the default mapping of shortcut(s) to event type,
the available event types can be found [here][event-types].

You can either use e.g. `"navigate-to-first-canvas"` or `KeyboardEventTypes.NAVIGATE_TO_FIRST_CANVAS` as key,
a documentation of the supported shortcuts given as value can be found [here][hotkeys-js].

## Contributing

Found a bug? The plugin is not working with your manifest? Want a new
feature? Create an issue, or if you want to take a shot at fixing it
yourself, make a fork, create a pull request, we're always open to
contributions :-)

For larger changes/features, it's usually wise to open an issue before
starting the work, so we can discuss if it's a fit.

**Note**: The package requires Node.js `16` and npm in major version `8`.

[demo-cfg]: https://github.com/dbmdz/mirador-keyboardshortcuts/blob/main/demo/src/index.js#L5-L40
[event-types]: https://github.com/dbmdz/mirador-keyboardshortcuts/blob/main/src/state/events.js#L5-L12
[hotkeys-js]: https://wangchujiang.com/hotkeys-js/#defining-shortcuts
[mirador]: https://github.com/ProjectMirador/mirador/releases/tag/v3.3.0
[mirador-badge]: https://img.shields.io/badge/Mirador-%E2%89%A53.3.0-blueviolet
[npm]: https://www.npmjs.org/package/mirador-keyboardshortcuts
[npm-badge]: https://img.shields.io/npm/v/mirador-keyboardshortcuts.png?style=flat-square
