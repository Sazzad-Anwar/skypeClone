import { LOGOUT } from '../Constants/LoginConstants';
import { CHAT_MESSAGES } from './../Constants/MessageConstants';

export const messageReducer = (state = [], action) => {
    switch (action.type) {
        case CHAT_MESSAGES:
            return action.payload;
        case LOGOUT:
            return {};
        default:
            return state;
    }
};
