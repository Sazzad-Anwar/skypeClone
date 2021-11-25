import {
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAILURE,
} from '../Constants/UserDetails';

export const getUserDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { isLoading: true };
        case USER_DETAILS_SUCCESS:
            return { isLoading: false, details: action.payload };
        case USER_DETAILS_FAILURE:
            return { isLoading: false, error: action.payload };
        default:
            return state;
    }
};
