# mirador-keyboardnavigation

[![npm package][npm-badge]][npm]
[![required Mirador version][mirador-badge]][mirador]

A Mirador 3 plugin which adds keyboard shortcuts for the following events:

- scroll to the first canvas (default shortcut: `ctrl+left`)
- scroll to the previous canvas (default shortcut: `left`)
- scroll to the next canvas (default shortcuts: `right`, `space`)
- scroll to the last canvas (default shortcut: `ctrl+right`)
- toggle fullscreen mode (default shortcut: `enter`)

## Installation

Currently the plugin can only be used if you build your own Mirador JavaScript bundle.
To include the plugin in your Mirador installation, you need to install it
from npm with `npm install mirador-keyboardnavigation`, import it into your project
and pass it to Mirador when you instantiate the viewer:

```javascript
import Mirador from 'mirador/dist/es/src/index';
import keyboardNavigationPlugin from 'mirador-keyboardnavigation/es';

const miradorConfig = {
  // Your Mirador configuration
}
Mirador.viewer(config, [...keyboardNavigationPlugin]);
```

## Configuration

You can configure the plugin just globally by adding the `keyboardNavigation` entry to
the top-level configuration:

```javascript
const miradorConfig = {
  // ...
  keyboardNavigation: {
    // Global config, see available settings below
  },
  // ...
}
```

You can view an example configuration in [demo/src/index.js][demo-cfg].

### Available settings

#### `shortcutMapping`

This is an override for the default mapping of shortcut(s) to event type,
the available event types can be found [here](event-types).

You can either use e.g. `"navigate-to-first-canvas"` or `KeyboardEventTypes.NAVIGATE_TO_FIRST_CANVAS` as key,
a documentation of the supported shortcuts given as value can be found [here](hotkeys-js).

## Contributing

Found a bug? The plugin is not working with your manifest? Want a new
feature? Create an issue, or if you want to take a shot at fixing it
yourself, make a fork, create a pull request, we're always open to
contributions :-)

For larger changes/features, it's usually wise to open an issue before
starting the work, so we can discuss if it's a fit.

**Note**: The package requires Node.js `16` and npm in major version `8`.

[demo-cfg]: https://github.com/dbmdz/mirador-keyboardnavigation/blob/main/demo/src/index.js#L5-L40
[event-types]: https://github.com/dbmdz/mirador-keyboardnavigation/blob/main/src/state/events.js#L5-L9
[hotkeys-js]: https://wangchujiang.com/hotkeys/#defining-shortcuts
[mirador]: https://github.com/ProjectMirador/mirador/releases/tag/v3.3.0
[mirador-badge]: https://img.shields.io/badge/Mirador-%E2%89%A53.3.0-blueviolet
[npm]: https://www.npmjs.org/package/mirador-keyboardnavigation
[npm-badge]: https://img.shields.io/npm/v/mirador-keyboardnavigation.png?style=flat-square
