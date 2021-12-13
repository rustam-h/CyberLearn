import { UserActionTypes } from "./user-types";

const INITIAL_STATE = {
    token: null,
    username: null
}

const userReducer  = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                token: action.payload.token,
                username: action.payload.username
            }
        case UserActionTypes.LOGOUT:
            return {
                ...state,
                token: null,
                username: null,
            }
        default:
            return state;
    }
}

export default userReducer;