const defaultState = {
    intervals: [],
    selectedInterval: null
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_INTERVALS':
            return { ...state, intervals: action.payload };
        case 'SET_SELECTED_INTERVAL':
            return { ...state, selectedInterval: action.payload };
        default:
            return state;
    }
}