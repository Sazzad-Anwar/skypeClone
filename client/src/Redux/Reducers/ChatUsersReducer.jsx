import { CHAT_USERS } from '../Constants/ChatUsersContants';
import { LOGOUT } from '../Constants/LoginConstants';

export const chatUsersReducer = (state = [], action) => {
    switch (action.type) {
        case CHAT_USERS:
            return action.payload;
        case LOGOUT:
            return {};
        default:
            return state;
    }
};
