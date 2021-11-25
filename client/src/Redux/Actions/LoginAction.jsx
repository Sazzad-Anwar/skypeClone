import {
    LOGIN_REQUEST,
    LOGIN_REQUEST_FAILED,
    LOGIN_REQUEST_SUCCESS,
    LOGOUT,
} from '../Constants/LoginConstants';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const login = (postData) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_REQUEST,
        });

        let {
            data: { token },
        } = await axios.post('/api/v1/login', postData);

        let user = jwt_decode(token);

        let {
            data: { data },
        } = await axios.get(`/api/v1/user/${user.details._id}`);

        // let token =
        //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTQ4OGU4YjUyNTFhMmVhMGQwMTcyNTAiLCJuYW1lIjoiTWlzcyBEb3JlZW4gR3JpbWVzIiwiZW1haWwiOiJNYXJjaWEzNEBob3RtYWlsLmNvbSIsInBob3RvIjoiaHR0cDovL3BsYWNlaW1nLmNvbS82NDAvNDgwL2J1c2luZXNzIiwidHlwZSI6InZlbmRvciIsImlhdCI6MTYzNDMyMDQwMSwiZXhwIjoxNjY1ODc4MDAxfQ.kG7fQ2XY6yz1qIQ4IYbGHDCxxBFTmdXIlWrED-YY3Ck';

        dispatch({
            type: LOGIN_REQUEST_SUCCESS,
            payload: data,
        });

        localStorage.setItem('token', JSON.stringify(token));
    } catch (error) {
        dispatch({
            type: LOGIN_REQUEST_FAILED,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const logOut = () => async (dispatch) => {
    localStorage.removeItem('token');
    dispatch({
        type: LOGOUT,
    });
};
