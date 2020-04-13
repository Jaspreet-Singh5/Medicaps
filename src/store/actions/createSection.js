import * as actionTypes from './actionTypes';
import axios from '../../axios-admin';

export const createSectionSuccess = ( res ) => {
    return {
        type: actionTypes.CREATE_SECTION_SUCCESS,
        res: res
    };
};

export const createSectionFail = ( error ) => {
    return {
        type: actionTypes.CREATE_SECTION_FAIL,
        error: error
    };
};

export const createSectionStart = () => {
    return {
        type: actionTypes.CREATE_SECTION_START
    };
};

export const createSection = (e, form) => {

    e.preventDefault();
    
    return dispatch => {
        dispatch(createSectionStart());

        const data = {
          name: form.name.value,
          academicYear: form.academicYear.value,
          nameInWords: form.nameInWords.value,
          totalStudents: form.totalStudents.value
        }
        
        console.log(data);

        axios.post( '/createSection', data)
            .then( res => { 
                dispatch(createSectionSuccess(res));
            } )
            .catch( err => {
                dispatch(createSectionFail(err));
            } );
    };
};