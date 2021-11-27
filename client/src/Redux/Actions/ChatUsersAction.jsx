import { CHAT_USERS } from './../Constants/ChatUsersContants';

export const chatUsersAction = (users) => async (dispatch) => {
    try {
        dispatch({
            type: CHAT_USERS,
            payload: users,
        });
    } catch (error) {
        console.log(error);
    }
};
