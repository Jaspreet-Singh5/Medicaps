import * as actionTypes from './actionTypes';
import axios from '../../axios-admin';

export const createClassFeeSuccess = ( res ) => {
    return {
        type: actionTypes.CREATE_CLASS_FEE_SUCCESS,
        res: res
    };
};

export const createClassFeeFail = ( error ) => {
    return {
        type: actionTypes.CREATE_CLASS_FEE_FAIL,
        error: error
    };
};

export const createClassFeeStart = () => {
    return {
        type: actionTypes.CREATE_CLASS_FEE_START
    };
};

export const createClassFee = (e, form, feesCollection) => {

    e.preventDefault();
    
    return dispatch => {
        dispatch(createClassFeeStart());

        const allFees = [];

        console.log(feesCollection);
        feesCollection.forEach(fee => {
            allFees.push({
                fee: fee._id,
                amount: +fee.amount
            })
        });

        const data = {  
          sectionName: form.sectionName.value,
          allFee: allFees
      }
        
        console.log(data);

        axios.post( '/createClassFee', data)
            .then( res => { 
                dispatch(createClassFeeSuccess(res));
            } )
            .catch( err => {
                dispatch(createClassFeeFail(err));
            } );
    };
};