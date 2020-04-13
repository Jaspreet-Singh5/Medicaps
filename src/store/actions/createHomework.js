import * as actionTypes from './actionTypes';
import axios from '../../axios-admin';

export const createHomeworkSuccess = ( res ) => {
    return {
        type: actionTypes.CREATE_HOMEWORK_SUCCESS,
        res: res
    };
};

export const createHomeworkFail = ( error ) => {
    return {
        type: actionTypes.CREATE_HOMEWORK_FAIL,
        error: error
    };
};

export const createHomeworkStart = () => {
    return {
        type: actionTypes.CREATE_HOMEWORK_START
    };
};

export const createHomework = (e, form, students) => {

    e.preventDefault();
    
    return dispatch => {
        dispatch(createHomeworkStart());

        const data = {
            subName: form.subName.value,
            homeworkGivenByTeacher: form.homeworkGivenByTeacher.value,
            sectionName: form.sectionName.value,
            homeworkDetails: form.homeworkDetails.value,
            dueDate: form.dueDate.value,
            assignedToStudents: students
        }
        
        console.log(data);
        axios.post( '/createHomework', data)
            .then( res => { 
                dispatch(createHomeworkSuccess(res));
            } )
            .catch( err => {
                dispatch(createHomeworkFail(err));
            } );
    };
};