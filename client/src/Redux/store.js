import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { loginReducer } from './Reducers/LoginReducer';
import jwt_decode from 'jwt-decode';

const reducer = combineReducers({
    user: loginReducer,
});

const initialState = {
    user: {
        details: localStorage.getItem('token') ? jwt_decode(localStorage.getItem('token')) : null
    }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
