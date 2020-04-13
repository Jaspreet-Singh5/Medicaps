import * as actionTypes from './actionTypes';
import axios from '../../axios-admin';

export const updateStudentFeeSuccess = ( res ) => {
    return {
        type: actionTypes.UPDATE_STUDENT_FEE_SUCCESS,
        res: res
    };
};

export const updateStudentFeeFail = ( error ) => {
    return {
        type: actionTypes.UPDATE_STUDENT_FEE_FAIL,
        error: error
    };
};

export const updateStudentFeeStart = () => {
    return {
        type: actionTypes.UPDATE_STUDENT_FEE_START
    };
};

export const updateStudentFee = (e, studentName, monthYear, admissionNumber, allFee, feeListings) => {

    e.preventDefault();
    
    return dispatch => {
        dispatch(updateStudentFeeStart());
        
        feeListings.forEach(fee => {

            delete fee.type;
            delete fee.frequency;

            fee.amountToPay = +fee.amountToPay;
            fee.due = fee.amountToPay === fee.amount ? "No Dues" : "Due";
            fee.paid = fee.amountToPay;
            fee.balance = fee.amount - fee.amountToPay;
            fee.amountToPay = fee.amount - fee.amountToPay;
        });

        const data = {  
          studentName: studentName,
          monthYear: monthYear,
          admissionNumber: admissionNumber,
          allFee: allFee,
          feeListings: feeListings
      }
        
        console.log(data);

        axios.post( `/updateStudentFee/${studentName}`, data)
            .then( res => { 
                dispatch(updateStudentFeeSuccess(res));
            } )
            .catch( err => {
                dispatch(updateStudentFeeFail(err));
            } );
    };
};