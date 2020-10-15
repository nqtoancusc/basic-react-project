import axios from 'axios';

import * as restApis from './restApis';
import * as actionTypes from './actionTypes';

export const registerStart = () => {
    return {
        type: actionTypes.REGISTER_START
    };
};

export const registerSuccess = (customerToken, customerUuid) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        customerToken: customerToken,
        customerUuid: customerUuid
    };
};

export const registerFail = (error) => {
    return {
        type: actionTypes.REGISTER_FAIL,
        error: error
    };
};

export const register = (email, password, businessId, invoicingAddress) => {
    return dispatch => {
        dispatch(registerStart());

        const registerData = {
            email: email,
            password: password,
            businessId: businessId,
            invoicingAddress: invoicingAddress,
            returnSecureToken: true
        };

        axios.post(restApis.PROTOCOL + ':' + '//' + restApis.HOST + restApis.CUSTOMER_REGISTRATION_ENDPOINT, JSON.stringify(registerData))
            .then(response => {
                if (response.data.statusCode === 200) {
                    const expirationTime = new Date(new Date().getTime() + response.data.tokenExpiration);
                    localStorage.setItem('customerToken', response.data.admin.token);
                    localStorage.setItem('expirationTime', expirationTime);
                    localStorage.setItem('customerUuid', response.data.admin.uuid);
                    dispatch(registerSuccess(response.data.admin.token, response.data.admin.uuid));
                }
            })
            .catch(err => {
                console.log(err)
                dispatch(registerFail(err));
            });
    };
};