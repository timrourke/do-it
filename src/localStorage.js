export const loadState = () => {
  try {
    const state = localStorage.getItem('state');

    if (state === null) {
      return undefined;
    }

    const serializedState = JSON.parse(state);

    return serializedState;
  } catch(err) {
    return undefined;
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);

    localStorage.setItem('state', serializedState);
  } catch(err) {
    // No-op.
  }
}
