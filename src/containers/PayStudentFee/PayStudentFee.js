import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import Badge from '@material-ui/core/Badge';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import lightBlue from '@material-ui/core/colors/lightBlue';
import TodayIcon from '@material-ui/icons/Today';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import MaterialTable from 'material-table';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Aux from '../../hoc/Hoc/Hoc';


import Input from '../../components/UI/Input/Input';

import axios from '../../axios-admin';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';



const styles = {
  table: {
    minWidth: 650,
    maxWidth: '80%',
    marginRight: 'auto',
    marginLeft: 'auto',
    border: '5px solid #eee'
  },

  detailsContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },

  shape: {
    backgroundColor: '#eee',
    width: 40,
    height: 40,
  },

  shapeCircle: {
    borderRadius: '50%',
  },
};

class PayStudentFee extends Component {

  state = {
    feesCollection: [],
    formIsValid: false
  }

  componentDidMount() {
    this.props.onFetchStudentFees(this.props.match.params.sid);
  }

  
  checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) {
        return true;
    }
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
}


  
  render() {

    const { classes } = this.props;
    const circle = <div className={clsx(classes.shape, classes.shapeCircle)} />;

    let form = null;
    if (!this.state.loading && this.props.fees) {
      console.log(this.props.fees);

      if (this.state.feesCollection.length == 0 ) {
        this.props.fees.forEach(fees => {
          fees.feeListings.forEach(fee => {
            this.state.feesCollection.push({
              fee: fee.fee._id,
              type: fee.fee.type,
              frequency: fee.fee.frequency,
              monthYear: fee.monthYear,
              due: fee.due,
              amount: fee.amount,
              paid: fee.paid,
              balance: fee.balance,
              amountToPay: fee.amountToPay
            })
          })
        })
      }

        form = 
          (this.state.feesCollection.length !== 0) ?
          <Aux>
            <MaterialTable
                style={{ margin: 10, width: '100%', fontSize: '1rem!important' }}
                title={'Fee Structure List'}
                columns={[
                    { title: 'Fee Type', field: 'type', type: 'string'
                    },
                    { title: 'Frequency', field: 'frequency', type: 'string' },
                    { title: 'Month Year', field: 'monthYear', type: 'date'
                    },
                    { title: 'Due', field: 'due', type: 'numeric' },
                    { title: 'Amount', field: 'amount', type: 'numeric' },
                    { title: 'Paid', field: 'paid', type: 'numeric' },
                    { title: 'Balance', field: 'balance', type: 'numeric' },
                    { title: 'Amount To Pay', field: 'amountToPay', type: 'numeric' }
                ]}
                data={this.state.feesCollection}
                editable={{
                  onRowAdd: (newData) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        resolve();
                        this.setState((prevState) => {
                          const slots = [...prevState.feesCollection];
                          slots.push(newData);
                          return { ...prevState, feesCollection: slots };
                        });
                      }, 600);
                    }),
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        resolve();
                        if (oldData) {
                          this.setState((prevState) => {
                            const feesCollection = [...prevState.feesCollection];
                            feesCollection[feesCollection.indexOf(oldData)] = newData;
                            return { ...prevState, feesCollection };
                          });
                        }
                      }, 600);
                    }),
                  onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        resolve();
                        this.setState((prevState) => {
                          const slots = [...prevState.feesCollection];
                          slots.splice(slots.indexOf(oldData), 1);
                          return { ...prevState, feesCollection: slots };
                        });
                      }, 600);
                    }),
                }}
              />

              
          </Aux>
          
              :
              ''
            ;

    } else {
      form = <Spinner></Spinner>
    }

    const goBack = () => {
      this.props.history.goBack();
    }

    const currDate = () => {
      const today = new Date();
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

      return date;
    }

    const currDay = () => {
      const today = new Date();

      let weekday = new Array(7);
      weekday[0] = "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";

      const day = weekday[today.getDay()];

      return day;
    }

    return (
      <div>

        <Typography variant="h2" gutterBottom style={{ textAlign: 'center' }}>
          Fee payment
          </Typography>
        <div className={classes.detailsContainer}>
          <Typography variant="h6" gutterBottom style={{ textAlign: 'left', margin: 20 }}>
            {/* CLASS AND SECTION {this.props.match.params.className} {this.props.match.params.sectionName}: */}
          </Typography>
          <Typography variant="h6" gutterBottom style={{ textAlign: 'left', margin: 20 }}>
            {/* DAY: {currDay()} */}
          </Typography>
          <Typography variant="h6" gutterBottom style={{ textAlign: 'left', margin: 20 }}>
            {/* DATE: {currDate()} */}
          </Typography>
        </div>

        {form}

        <Grid container className={classes.root} spacing={2} justify="space-around" style={{ marginTop: 10 }}>
          

          <Grid item xs={2}>

            <Button
              fullWidth
              style={{ margin: 10 }}
              type="submit"
              name="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<ArrowForwardIcon />}
              onClick={(e) => this.props.onUpdateStudentFee(e, this.props.fees[0].studentName._id, this.props.fees[0].monthYear, this.props.fees[0].admissionNumber, this.props.fees[0].allFee, this.state.feesCollection)}
            >
              Update Student Fee
            </Button>
            
            <Button
              variant="contained"
              color="primary"
              style={{ width: '100%' }}
              // style={{ width: '10%', float: 'right', margin: 50, marginRight: 150 }}
              onClick={goBack}
            >
              Back
                </Button>
          </Grid>
        </Grid>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fees: state.viewStudentFees.fees,
    loading: state.viewStudentFees.loading,
    alert: state.viewStudentFees.alert,
    error: state.viewStudentFees.error,

    updateres: state.updateStudentFee.res,
    updateloading: state.updateStudentFee.loading,
    updatealert: state.updateStudentFee.alert,
    updateerror: state.updateStudentFee.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchStudentFees: (sid) => dispatch(actions.fetchStudentFees(sid)),
    onUpdateStudentFee: (e, studentName, monthYear, admissionNumber, allFee, feeListings) => dispatch(actions.updateStudentFee(e, studentName, monthYear, admissionNumber, allFee, feeListings)), 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withStyles(styles)(PayStudentFee), axios));