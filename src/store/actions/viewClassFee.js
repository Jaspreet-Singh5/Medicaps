import * as actionTypes from './actionTypes';
import axios from '../../axios-admin';

export const fetchClassFeesSuccess = ( fees ) => {
    return {
        type: actionTypes.FETCH_CLASS_FEE_SUCCESS,
        fees: fees
    };
};

export const fetchClassFeesFail = ( error ) => {
    return {
        type: actionTypes.FETCH_CLASS_FEE_FAIL,
        error: error
    };
};

export const fetchClassFeesStart = () => {
    return {
        type: actionTypes.FETCH_CLASS_FEE_START
    };
};

export const fetchClassFees = () => {
    return dispatch => {
        dispatch(fetchClassFeesStart());
        axios.get( `/readClassFee`)
            .then( res => {
                const fetchedFees = res.data;

                fetchedFees.forEach(classFee => {
                    classFee.fees = '';
                    classFee.allFee.forEach(fee => {
                        classFee.fees += fee.fee.type + ' ' + fee.fee.frequency + ' ' + fee.amount + '\n';
                    }) 
                });
                
                dispatch(fetchClassFeesSuccess(fetchedFees));
            } )
            .catch( err => {
                dispatch(fetchClassFeesFail(err));
            } );
    };
};