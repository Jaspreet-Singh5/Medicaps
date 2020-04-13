import * as actionTypes from './actionTypes';
import axios from '../../axios-admin';

export const createStudentFeeSuccess = ( res ) => {
    return {
        type: actionTypes.CREATE_STUDENT_FEE_SUCCESS,
        res: res
    };
};

export const createStudentFeeFail = ( error ) => {
    return {
        type: actionTypes.CREATE_STUDENT_FEE_FAIL,
        error: error
    };
};

export const createStudentFeeStart = () => {
    return {
        type: actionTypes.CREATE_STUDENT_FEE_START
    };
};

export const createStudentFee = (e, form, feesCollection) => {

    e.preventDefault();
    
    return dispatch => {
        dispatch(createStudentFeeStart());

        console.log('feesCollection');
        console.log(feesCollection);

        const allFees = feesCollection[0].allFee;
        const studentFee = [];

        console.log(allFees);
        allFees.forEach(fee => {
            studentFee.push({
                fee: fee.fee._id,
                amount: fee.amount
            })
        });

        console.log(studentFee);

        const feeListings = [];
        feesCollection[0].allFee.forEach(fee => {
            const n = fee.fee.frequency === 'monthly' ? 12 : fee.fee.frequency === 'quaterly' ? 4 : 1;
            const m = fee.fee.frequency === 'monthly' ? 1 : fee.fee.frequency === 'quaterly' ? 3 : 0;
            let monthYr = new Date(form.monthYear.value);

            for(let i=0;i<n;i++) {
                feeListings.push({
                fee: fee.fee,
                monthYear: monthYr,
                due: 'Due',
                amount: fee.amount,
                paid: 0,
                balance: fee.amount,
                amountToPay: fee.amount
                })

                monthYr = new Date(monthYr.setMonth(monthYr.getMonth() + m)) ;
                
            }
        });

        console.log("Fee Listings");
        console.log(feeListings);

        const data = {  
          studentName: form.studentName.value,
          monthYear: form.monthYear.value,
          admissionNumber: +form.admissionNumber.value,
          allFee: studentFee,
          feeListings: feeListings
      }
        
        console.log(data);

        axios.post( '/createStudentFee', data)
            .then( res => { 
                dispatch(createStudentFeeSuccess(res));
            } )
            .catch( err => {
                dispatch(createStudentFeeFail(err));
            } );
    };
};