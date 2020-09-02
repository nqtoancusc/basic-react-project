import axios from 'axios';

import * as restApis from './restApis';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (customerToken, customerUuid) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        customerToken: customerToken,
        customerUuid: customerUuid
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('customerToken');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('customerUuid');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        axios.post(restApis.PROTOCOL + ':' + '//' + restApis.HOST + restApis.ADMIN_LOGIN_ENDPOINT, JSON.stringify(authData))
            .then(response => {
                if (response.data.statusCode === 200) {
                    const expirationTime = new Date(new Date().getTime() + response.data.tokenExpiration);
                    localStorage.setItem('customerToken', response.data.admin.token);
                    localStorage.setItem('expirationTime', expirationTime);
                    localStorage.setItem('customerUuid', response.data.admin.uuid);
                    dispatch(authSuccess(response.data.admin.token, response.data.admin.uuid));
                    dispatch(checkAuthTimeout(expirationTime));
                }
            })
            .catch(err => {
                console.log(err)
                dispatch(authFail(err));
            });
    };
};