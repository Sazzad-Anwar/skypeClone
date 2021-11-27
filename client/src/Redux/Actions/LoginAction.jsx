import {
    LOGIN_REQUEST,
    LOGIN_REQUEST_FAILED,
    LOGIN_REQUEST_SUCCESS,
    LOGOUT,
    REGISTRATION_REQUEST,
    REGISTRATION_REQUEST_SUCCESS,
    REGISTRATION_REQUEST_FAILED,
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

export const registrationAction = (postData) => async (dispatch) => {
    try {
        dispatch({
            type: REGISTRATION_REQUEST,
        });

        let {
            data: { token },
        } = await axios.post('/api/v1/registration', postData);

        let user = jwt_decode(token);

        dispatch({
            type: REGISTRATION_REQUEST_SUCCESS,
            payload: user,
        });

        localStorage.setItem('token', JSON.stringify(token));
    } catch (error) {
        dispatch({
            type: REGISTRATION_REQUEST_FAILED,
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
