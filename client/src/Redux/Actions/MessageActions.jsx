import { CHAT_MESSAGES } from './../Constants/MessageConstants';

export const messagesAction = (messages) => async (dispatch) => {
    try {
        dispatch({
            type: CHAT_MESSAGES,
            payload: messages,
        });
    } catch (error) {
        console.log(error);
    }
};
