import * as actionTypes from './actionTypes';
import axios from '../../axios-admin';

export const fetchTimeslotsForStudentsSuccess = ( timeslots ) => {
    return {
        type: actionTypes.FETCH_TIMESLOTS_STUDENTS_SUCCESS,
        timeslots: timeslots
    };
};

export const fetchTimeslotsForStudentsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_TIMESLOTS_STUDENTS_FAIL,
        error: error
    };
};

export const fetchTimeslotsForStudentsStart = () => {
    return {
        type: actionTypes.FETCH_TIMESLOTS_STUDENTS_START
    };
};

export const fetchTimeslotsForStudents = (sid) => {
    return dispatch => {
        dispatch(fetchTimeslotsForStudentsStart());
        axios.get( `/timetableForStudents/${sid}`)
            .then( res => {
                const fetchedTimeSlots = res.data;
                
                console.log(fetchedTimeSlots);
                dispatch(fetchTimeslotsForStudentsSuccess(fetchedTimeSlots));
            })
            .catch( err => {
                dispatch(fetchTimeslotsForStudentsFail(err));
            } );
    };
};