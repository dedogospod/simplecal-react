const defaultState = false;

export default (state = defaultState, action) => {
    switch(action.type){
        case 'SET_USER': 
            return action.payload;
        default:
            return state;
    }
}