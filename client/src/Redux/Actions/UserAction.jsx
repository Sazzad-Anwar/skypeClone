import axios from 'axios';
import {
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAILURE,
} from '../Constants/UserDetails';

export const userDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        });

        let {
            data: { data },
        } = await axios.get(`/api/v1/user/${id}`);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
