import * as actionTypes from './actionTypes';
import axios from '../../axios-subjectsHomeWorkForStudents';

export const fetchSubjectsHomeWorkForStudentsSuccess = ( homeworks ) => {
    return {
        type: actionTypes.FETCH_SUBJECTS_HOMEWORK_STUDENTS_SUCCESS,
        homeworks: homeworks
    };
};

export const fetchSubjectsHomeWorkForStudentsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_SUBJECTS_HOMEWORK_STUDENTS_FAIL,
        error: error
    };
};

export const fetchSubjectsHomeWorkForStudentsStart = () => {
    return {
        type: actionTypes.FETCH_SUBJECTS_HOMEWORK_STUDENTS_START
    };
};

export const fetchSubjectsHomeWorkForStudents = (id) => {
    return dispatch => {
        dispatch(fetchSubjectsHomeWorkForStudentsStart());
        axios.get( `/orders.json`)
            .then( res => {
                const fetchedHomeWorks = [
                    {
                        subName: 'Math',
                        sectionName: 'XI A',
                        homeworkGivenByTeacher: 'Samu',
                        homeworkDetails: 'Do it properly and as soon as possible',
                        dueDate: '02-04-2020',
                        status: 'complete'
                    },
                    {
                        subName: 'Math',
                        sectionName: 'XI A',
                        homeworkGivenByTeacher: 'Samu',
                        homeworkDetails: 'Do it properly and as soon as possible',
                        dueDate: '02-04-2020',
                        status: 'complete'
                    },
                    {
                        subName: 'Math',
                        sectionName: 'XI A',
                        homeworkGivenByTeacher: 'Samu',
                        homeworkDetails: 'Do it properly and as soon as possible',
                        dueDate: '02-04-2020',
                        status: 'complete'
                    },
                    {
                        subName: 'Math',
                        sectionName: 'XI A',
                        homeworkGivenByTeacher: 'Samu',
                        homeworkDetails: 'Do it properly and as soon as possible',
                        dueDate: '02-04-2020',
                        status: 'incomplete'
                    },
                    {
                        subName: 'Math',
                        sectionName: 'XI A',
                        homeworkGivenByTeacher: 'Samu',
                        homeworkDetails: 'Do it properly and as soon as possible',
                        dueDate: '02-04-2020',
                        status: 'incomplete'
                    },
                    {
                        subName: 'Math',
                        sectionName: 'XI A',
                        homeworkGivenByTeacher: 'Samu',
                        homeworkDetails: 'Do it properly and as soon as possible',
                        dueDate: '02-04-2020',
                        status: 'complete'
                    }
                ];
                
                dispatch(fetchSubjectsHomeWorkForStudentsSuccess(fetchedHomeWorks));
            } )
            .catch( err => {
                dispatch(fetchSubjectsHomeWorkForStudentsFail(err));
            } );
    };
};