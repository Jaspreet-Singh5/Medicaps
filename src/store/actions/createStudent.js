import * as actionTypes from './actionTypes';
import axios from '../../axios-admin';

export const createStudentSuccess = ( res ) => {
    return {
        type: actionTypes.CREATE_STUDENT_SUCCESS,
        res: res
    };
};

export const createStudentFail = ( error ) => {
    return {
        type: actionTypes.CREATE_STUDENT_FAIL,
        error: error
    };
};

export const createStudentStart = () => {
    return {
        type: actionTypes.CREATE_STUDENT_START
    };
};

export const createStudent = (e, form) => {

    e.preventDefault();
    
    return dispatch => {
        dispatch(createStudentStart());

        const data = {
          name: form.name.value,
          sectionName: form.sectionName.value,
          fatherName: form.fatherName.value,
          motherName: form.motherName.value,
          address: form.address.value,
          dob: form.dob.value,
          aadharNumber: form.aadharNumber.value,
          accountNumber: form.accountNumber.value,
          photo: form.photo.value,
          enrollmentNumber: form.enrollmentNumber.value,
          rollNumber: form.rollNumber.value,
          password: form.password.value,
          SSSMID: form.SSSMID.value
      }
        
        console.log(data);

        axios.post( '/createStudent', data)
            .then( (res, errors, msg) => { 
                console.log(res);
                console.log(errors);
                console.log(msg);
                dispatch(createStudentSuccess(res));
            } )
            .catch( err => {
                console.log(err);
                dispatch(createStudentFail(err));
            } );
    };
};