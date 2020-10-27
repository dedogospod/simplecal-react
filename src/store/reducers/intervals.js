const defaultState = {
    intervals: []
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_INTERVALS':
            return { ...state, intervals: action.payload };
        default:
            return state;
    }
}