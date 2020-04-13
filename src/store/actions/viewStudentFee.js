import * as actionTypes from './actionTypes';
import axios from '../../axios-admin';

export const fetchStudentFeesSuccess = ( fees ) => {
    return {
        type: actionTypes.FETCH_STUDENT_FEE_SUCCESS,
        fees: fees
    };
};

export const fetchStudentFeesFail = ( error ) => {
    return {
        type: actionTypes.FETCH_STUDENT_FEE_FAIL,
        error: error
    };
};

export const fetchStudentFeesStart = () => {
    return {
        type: actionTypes.FETCH_STUDENT_FEE_START
    };
};

export const fetchClassReport = () => {
    return dispatch => {
        dispatch(fetchStudentFeesStart());
        axios.get( `/readStudentFee`)
            .then( res => {
                const fetchedFees = res.data;

                dispatch(fetchStudentFeesSuccess(fetchedFees));
            } )
            .catch( err => {
                dispatch(fetchStudentFeesFail(err));
            } );
    };
};

export const fetchStudentFees = (sid) => {
    return dispatch => {
        dispatch(fetchStudentFeesStart());
        axios.get( `/readStudentFee/${sid}`)
            .then( res => {
                const fetchedFees = res.data;

                fetchedFees.forEach(classFee => {
                    classFee.fees = '';
                    classFee.allFee.forEach(fee => {
                        classFee.fees += fee.fee.type + ' ' + fee.fee.frequency + ' ' + fee.amount + '\n';
                    }) 
                });
                
                dispatch(fetchStudentFeesSuccess(fetchedFees));
            } )
            .catch( err => {
                dispatch(fetchStudentFeesFail(err));
            } );
    };
};