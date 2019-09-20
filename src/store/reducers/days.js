const defaultState = {
    day: null,
    list: [],
    entries: []
};

export default (state = defaultState, action) => {
    switch(action.type){
        case 'SET_DAYS': 
            return { ...state, list: action.payload };
        case 'SET_DAY':
            return { ...state, day: action.payload };
        case 'SET_ENTRIES':
            return { ...state, entries: action.payload };
        default:
            return state;
    }
}