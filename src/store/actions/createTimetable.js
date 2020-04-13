import * as actionTypes from './actionTypes';
import axios from '../../axios-admin';

export const createTimetableSuccess = ( res ) => {
    return {
        type: actionTypes.CREATE_TIMETABLE_SUCCESS,
        res: res
    };
};

export const createTimetableFail = ( error ) => {
    return {
        type: actionTypes.CREATE_TIMETABLE_FAIL,
        error: error
    };
};

export const createTimetableStart = () => {
    return {
        type: actionTypes.CREATE_TIMETABLE_START
    };
};

export const createTimetable = (e, form, mondaySlots, 
    tuesdaySlots, wednesdaySlots,
    thursdaySlots, fridaySlots,
    saturdaySlots) => {

    e.preventDefault();
    
    return dispatch => {
        dispatch(createTimetableStart());

        const data = {
            sectionName: form.sectionName.value,
            releaseDate: form.releaseDate.value,
            timetableDetails: [
                {
                  dayName: "monday",
                  slots: mondaySlots,
                },
                {
                  dayName: "tuesday",
                  slots: tuesdaySlots,
                },
                {
                  dayName: "wednesday",
                  slots: wednesdaySlots,
                },
                {
                  dayName: "thursday",
                  slots: thursdaySlots,
                },
                {
                  dayName: "friday",
                  slots: fridaySlots,
                },
                {
                  dayName: "saturday",
                  slots: saturdaySlots,
                },
              ]  
        }
        
        console.log(data);
        axios.post( '/createTimetable', data)
            .then( res => { 
                dispatch(createTimetableSuccess(res));
            } )
            .catch( err => {
                dispatch(createTimetableFail(err));
            } );
    };
};