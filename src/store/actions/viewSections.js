import * as actionTypes from './actionTypes';
import axios from '../../axios-admin';

export const fetchSectionsSuccess = ( users ) => {
    return {
        type: actionTypes.FETCH_SECTIONS_SUCCESS,
        users: users
    };
};

export const fetchSectionsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_SECTIONS_FAIL,
        error: error
    };
};

export const fetchSectionsStart = () => {
    return {
        type: actionTypes.FETCH_SECTIONS_START
    };
};

export const fetchSections = () => {
    return dispatch => {
        dispatch(fetchSectionsStart());
        axios.get( `/viewSection`)
            .then( res => {
                const fetchedSections = res.data.sections;
                
                dispatch(fetchSectionsSuccess(fetchedSections));
            } )
            .catch( err => {
                dispatch(fetchSectionsFail(err));
            } );
    };
};