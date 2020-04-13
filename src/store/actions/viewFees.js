import * as actionTypes from './actionTypes';
import axios from '../../axios-admin';

export const fetchFeesSuccess = ( fees ) => {
    return {
        type: actionTypes.FETCH_FEE_SUCCESS,
        fees: fees
    };
};

export const fetchFeesFail = ( error ) => {
    return {
        type: actionTypes.FETCH_FEE_FAIL,
        error: error
    };
};

export const fetchFeesStart = () => {
    return {
        type: actionTypes.FETCH_FEE_START
    };
};

export const fetchFees = () => {
    return dispatch => {
        dispatch(fetchFeesStart());
        axios.get( `/readFee`)
            .then( res => {
                const fetchedFees = res.data;
                
                dispatch(fetchFeesSuccess(fetchedFees));
            } )
            .catch( err => {
                dispatch(fetchFeesFail(err));
            } );
    };
};