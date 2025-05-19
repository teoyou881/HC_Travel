export function createSetValueAction(type) {
    return (key, value) => ({ type, key, value });
}

export function setValueReducer(state, action) {
    // console.log(action);
    state[action.key] = action.value;
}
