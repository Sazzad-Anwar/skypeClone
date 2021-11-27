import { io } from 'socket.io-client';

const SOCKET = 'SOCKET';

export const socketReducer = (state = {}, action) => {
    switch (action.type) {
        case SOCKET:
            return action.payload;
        default:
            return state;
    }
};

export const socketAction = () => (dispatch) => {
    let socket = io('/');
    socket.on('connect', () => {
        dispatch({
            type: SOCKET,
            payload: socket,
        });
    });
};
