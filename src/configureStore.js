import { createStore } from 'redux';
import { loadState, saveState } from './localStorage';
import todoApp from './reducers';

/**
 * Configure the store
 *
 * @return {Redux.Store}
 */
export default () => {
  // Attempt to load persisted state from local storage
  const persistedState = loadState();

  const store = createStore(
    todoApp,
    persistedState
  );

  // Persist the state on window.onunload
  window.onunload = () => saveState(store.getState());

  return store;
};
