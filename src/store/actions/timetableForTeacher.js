import * as actionTypes from './actionTypes';
import axios from '../../axios-timeslotsForTeacher';

export const fetchTimeslotsForTeacherSuccess = ( timeslots ) => {
    return {
        type: actionTypes.FETCH_TIMESLOTS_TEACHER_SUCCESS,
        timeslots: timeslots
    };
};

export const fetchTimeslotsForTeacherFail = ( error ) => {
    return {
        type: actionTypes.FETCH_TIMESLOTS_TEACHER_FAIL,
        error: error
    };
};

export const fetchTimeslotsForTeacherStart = () => {
    return {
        type: actionTypes.FETCH_TIMESLOTS_TEACHER_START
    };
};

export const fetchTimeslotsForTeacher = (id) => {
    return dispatch => {
        dispatch(fetchTimeslotsForTeacherStart());
        axios.get( `/orders.json`)
            .then( res => {
                const fetchedTimeSlots = [
                    {
                        dayName: 'monday',
                        slots: [
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                startTime: '2012-12-04T8:00:00.000Z',
                                endTime: '2012-12-04T9:00:00.000Z'
                            },
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                startTime: '2012-12-04T9:00:00.000Z',
                                endTime: '2012-12-04T10:00:00.000Z'
                            },
                            {
                                subName: '',
                                sectionName: '',
                                
                                startTime: '2012-12-04T10:00:00.000Z',
                                endTime: '2012-12-04T11:00:00.000Z'
                            },
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                
                                startTime: '2012-12-04T11:00:00.000Z',
                                endTime: '2012-12-04T12:00:00.000Z'
                            },
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                
                                startTime: '2012-12-04T12:00:00.000Z',
                                endTime: '2012-12-04T9:13:00.000Z'
                            },
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                
                                startTime: '2012-12-04T13:00:00.000Z',
                                endTime: '2012-12-04T14:00:00.000Z'
                            },
                        ]
                    },
                    {
                        dayName: 'tuesday',
                        slots: [
                            {
                                subName: '',
                                sectionName: '',
                                
                                startTime: '2012-12-04T8:00:00.000Z',
                                endTime: '2012-12-04T9:00:00.000Z'
                            },
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                
                                startTime: '2012-12-04T9:00:00.000Z',
                                endTime: '2012-12-04T10:00:00.000Z'
                            },
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                
                                startTime: '2012-12-04T10:00:00.000Z',
                                endTime: '2012-12-04T11:00:00.000Z'
                            },
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                
                                startTime: '2012-12-04T11:00:00.000Z',
                                endTime: '2012-12-04T12:00:00.000Z'
                            },
                            {
                                subName: '',
                                sectionName: '',
                                
                                startTime: '2012-12-04T12:00:00.000Z',
                                endTime: '2012-12-04T9:13:00.000Z'
                            },
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                
                                startTime: '2012-12-04T13:00:00.000Z',
                                endTime: '2012-12-04T14:00:00.000Z'
                            },
                        ]
                    },
                    {
                        dayName: 'wednesday',
                        slots: [
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                
                                startTime: '2012-12-04T8:00:00.000Z',
                                endTime: '2012-12-04T9:00:00.000Z'
                            },
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                
                                startTime: '2012-12-04T9:00:00.000Z',
                                endTime: '2012-12-04T10:00:00.000Z'
                            },
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                
                                startTime: '2012-12-04T10:00:00.000Z',
                                endTime: '2012-12-04T11:00:00.000Z'
                            },
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                
                                startTime: '2012-12-04T11:00:00.000Z',
                                endTime: '2012-12-04T12:00:00.000Z'
                            },
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                
                                startTime: '2012-12-04T12:00:00.000Z',
                                endTime: '2012-12-04T9:13:00.000Z'
                            },
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                
                                startTime: '2012-12-04T13:00:00.000Z',
                                endTime: '2012-12-04T14:00:00.000Z'
                            },
                        ]
                    },
                    {
                        dayName: 'thursday',
                        slots: [
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                
                                startTime: '2012-12-04T8:00:00.000Z',
                                endTime: '2012-12-04T9:00:00.000Z'
                            },
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                
                                startTime: '2012-12-04T9:00:00.000Z',
                                endTime: '2012-12-04T10:00:00.000Z'
                            },
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                
                                startTime: '2012-12-04T10:00:00.000Z',
                                endTime: '2012-12-04T11:00:00.000Z'
                            },
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                
                                startTime: '2012-12-04T11:00:00.000Z',
                                endTime: '2012-12-04T12:00:00.000Z'
                            },
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                
                                startTime: '2012-12-04T12:00:00.000Z',
                                endTime: '2012-12-04T9:13:00.000Z'
                            },
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                
                                startTime: '2012-12-04T13:00:00.000Z',
                                endTime: '2012-12-04T14:00:00.000Z'
                            },
                        ]
                    },
                    {
                        dayName: 'friday',
                        slots: [
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                
                                startTime: '2012-12-04T8:00:00.000Z',
                                endTime: '2012-12-04T9:00:00.000Z'
                            },
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                
                                startTime: '2012-12-04T9:00:00.000Z',
                                endTime: '2012-12-04T10:00:00.000Z'
                            },
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                
                                startTime: '2012-12-04T10:00:00.000Z',
                                endTime: '2012-12-04T11:00:00.000Z'
                            },
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                
                                startTime: '2012-12-04T11:00:00.000Z',
                                endTime: '2012-12-04T12:00:00.000Z'
                            },
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                
                                startTime: '2012-12-04T12:00:00.000Z',
                                endTime: '2012-12-04T9:13:00.000Z'
                            },
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                
                                startTime: '2012-12-04T13:00:00.000Z',
                                endTime: '2012-12-04T14:00:00.000Z'
                            },
                        ]
                    },
                    {
                        dayName: 'saturday',
                        slots: [
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                
                                startTime: '2012-12-04T8:00:00.000Z',
                                endTime: '2012-12-04T9:00:00.000Z'
                            },
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                
                                startTime: '2012-12-04T9:00:00.000Z',
                                endTime: '2012-12-04T10:00:00.000Z'
                            },
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                
                                startTime: '2012-12-04T10:00:00.000Z',
                                endTime: '2012-12-04T11:00:00.000Z'
                            },
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                
                                startTime: '2012-12-04T11:00:00.000Z',
                                endTime: '2012-12-04T12:00:00.000Z'
                            },
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                
                                startTime: '2012-12-04T12:00:00.000Z',
                                endTime: '2012-12-04T9:13:00.000Z'
                            },
                            {
                                subName: 'Math',
                                sectionName: 'XI A',
                                
                                startTime: '2012-12-04T13:00:00.000Z',
                                endTime: '2012-12-04T14:00:00.000Z'
                            },
                        ]
                    }
                ];
                
                dispatch(fetchTimeslotsForTeacherSuccess(fetchedTimeSlots));
            } )
            .catch( err => {
                dispatch(fetchTimeslotsForTeacherFail(err));
            } );
    };
};