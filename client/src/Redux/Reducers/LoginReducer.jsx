import {
    LOGIN_REQUEST,
    LOGIN_REQUEST_FAILED,
    LOGIN_REQUEST_SUCCESS,
    LOGOUT,
    REGISTRATION_REQUEST,
    REGISTRATION_REQUEST_SUCCESS,
    REGISTRATION_REQUEST_FAILED,
} from '../Constants/LoginConstants';

export const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { isLoading: true };
        case LOGIN_REQUEST_SUCCESS:
            return action.payload;
        case LOGIN_REQUEST_FAILED:
            return { isLoading: false, error: action.payload };
        case LOGOUT:
            return {};
        default:
            return state;
    }
};

export const registerReducer = (state = {}, action) => {
    switch (action.type) {
        case REGISTRATION_REQUEST:
            return { isLoading: true };
        case REGISTRATION_REQUEST_SUCCESS:
            return action.payload;
        case REGISTRATION_REQUEST_FAILED:
            return { isLoading: false, error: action.payload };
        default:
            return state;
    }
};
