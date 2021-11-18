// import axios from 'axios';
import {
    LOGIN_REQUEST,
    LOGIN_REQUEST_FAILED,
    LOGIN_REQUEST_SUCCESS,
    LOGOUT,
} from '../Constants/LoginConstants';
import jwt_decode from 'jwt-decode';

export const login = (postData) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_REQUEST,
        });

        // let { data: tokenData } = await axios.post('/vendor/login', postData);

        // let token = tokenData.data.refreshToken;

        let token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTQ4OGU4YjUyNTFhMmVhMGQwMTcyNTAiLCJuYW1lIjoiTWlzcyBEb3JlZW4gR3JpbWVzIiwiZW1haWwiOiJNYXJjaWEzNEBob3RtYWlsLmNvbSIsInBob3RvIjoiaHR0cDovL3BsYWNlaW1nLmNvbS82NDAvNDgwL2J1c2luZXNzIiwidHlwZSI6InZlbmRvciIsImlhdCI6MTYzNDMyMDQwMSwiZXhwIjoxNjY1ODc4MDAxfQ.kG7fQ2XY6yz1qIQ4IYbGHDCxxBFTmdXIlWrED-YY3Ck';

        let user = jwt_decode(token);

        dispatch({
            type: LOGIN_REQUEST_SUCCESS,
            payload: user,
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
