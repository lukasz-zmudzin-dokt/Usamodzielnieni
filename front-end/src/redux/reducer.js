import { combineReducers } from 'redux';
import { SET_USER_TOKEN } from './actions';

const user = (state = {}, action) => {
    console.log("user reducer:", state, action);
    switch (action.type) {
        case SET_USER_TOKEN:
            const { token } = action;
            return { ...state, token };
        default:
            return state;
    }
}

const reducer = combineReducers({ user });

export default reducer;