import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { loginReducer } from './Reducers/LoginReducer';
import jwt_decode from 'jwt-decode';
import { getUserDetailsReducer } from './Reducers/UserReducer';
import { chatUsersReducer } from './Reducers/ChatUsersReducer';
import { messageReducer } from './Reducers/MessageReducers';
import { socketReducer } from './../Components/socketRedux';

const reducer = combineReducers({
    user: loginReducer,
    details: getUserDetailsReducer,
    chatUsers: chatUsersReducer,
    messages: messageReducer,
    socket: socketReducer
});

const initialState = {
    user: localStorage.getItem('token') ? jwt_decode(localStorage.getItem('token')) : null,
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
