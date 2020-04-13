import * as actionTypes from './actionTypes';
import axios from '../../axios-homeWorkAssignedToAllClasses';

export const fetchHomeWorkAssignedToAllClassesSuccess = ( homeworks ) => {
    return {
        type: actionTypes.FETCH_HOMEWORK_ASSIGNED_ALLCLASSES_SUCCESS,
        homeworks: homeworks
    };
};

export const fetchHomeWorkAssignedToAllClassesFail = ( error ) => {
    return {
        type: actionTypes.FETCH_HOMEWORK_ASSIGNED_ALLCLASSES_FAIL,
        error: error
    };
};

export const fetchHomeWorkAssignedToAllClassesStart = () => {
    return {
        type: actionTypes.FETCH_HOMEWORK_ASSIGNED_ALLCLASSES_START
    };
};

export const fetchHomeWorkAssignedToAllClasses = (id) => {
    return dispatch => {
        dispatch(fetchHomeWorkAssignedToAllClassesStart());
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
                
                dispatch(fetchHomeWorkAssignedToAllClassesSuccess(fetchedHomeWorks));
            } )
            .catch( err => {
                dispatch(fetchHomeWorkAssignedToAllClassesFail(err));
            } );
    };
};