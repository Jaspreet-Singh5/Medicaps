import * as actionTypes from './actionTypes';
import axios from '../../axios-admin';

export const createTeacherSuccess = ( res ) => {
    return {
        type: actionTypes.CREATE_TEACHER_SUCCESS,
        res: res
    };
};

export const createTeacherFail = ( error ) => {
    return {
        type: actionTypes.CREATE_TEACHER_FAIL,
        error: error
    };
};

export const createTeacherStart = () => {
    return {
        type: actionTypes.CREATE_TEACHER_START
    };
};

export const createTeacher = (e, form) => {

    e.preventDefault();
    
    return dispatch => {
        dispatch(createTeacherStart());

        const data = {
          name: form.name.value,
          fatherOrSpouseName: form.fatherOrSpouseName.value,
          address: form.address.value,
          dob: form.dob.value,
          aadharNumber: form.aadharNumber.value,
          accountNumber: form.accountNumber.value,
          photo: form.photo.value,
          email: form.email.value,
          dateOfJoining: form.dateOfJoining.value,
          password: form.password.value,
          positionOfResponsibility: form.positionOfResponsibility.value,
          education: form.education.value,
          salary: form.salary.value,
          SSSMID: form.SSSMID.value
      }
        
        console.log(data);

        axios.post( '/createTeacher', data)
            .then( res => { 
                dispatch(createTeacherSuccess(res));
            } )
            .catch( err => {
                dispatch(createTeacherFail(err));
            } );
    };
};