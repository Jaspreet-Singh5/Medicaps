import * as actionTypes from './actionTypes';
import axios from '../../axios-admin';

export const createFeeSuccess = ( res ) => {
    return {
        type: actionTypes.CREATE_FEE_SUCCESS,
        res: res
    };
};

export const createFeeFail = ( error ) => {
    return {
        type: actionTypes.CREATE_FEE_FAIL,
        error: error
    };
};

export const createFeeStart = () => {
    return {
        type: actionTypes.CREATE_FEE_START
    };
};

export const createFee = (e, form) => {

    e.preventDefault();
    
    return dispatch => {
        dispatch(createFeeStart());

        const data = {
          type: form.type.value,
          frequency: form.frequency.value,
          status: form.status.value
      }
        
        console.log(data);

        axios.post( '/createFee', data)
            .then( res => { 
                dispatch(createFeeSuccess(res));
            } )
            .catch( err => {
                dispatch(createFeeFail(err));
            } );
    };
};