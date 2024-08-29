import { getConfig } from 'mirador/dist/es/src/state/selectors';

import { KeyboardEventTypes } from './state/events';
import keyboardShortcutsSaga from './state/sagas';

import Workspace from './components/Workspace';

export default [
  {
    saga: keyboardShortcutsSaga,
    target: 'Workspace',
    mode: 'wrap',
    component: Workspace,
    mapStateToProps: (state) => ({
      keyboardShortcuts: getConfig(state).keyboardShortcuts,
    }),
  },
];

export { KeyboardEventTypes };
