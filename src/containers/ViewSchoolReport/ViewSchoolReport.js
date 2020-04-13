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

class ViewSchoolReport extends Component {

  state = {
    formIsValid: false
  }

  componentDidMount() {
    this.props.onFetchClassReport();
    this.props.onFetchSections();
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
    const classData = [];
    
   
    if (!this.state.loading && this.props.fees) {
      console.log(this.props.fees);

      if (this.props.sections) {

        this.props.sections.forEach(sec => {
          
          this.state[sec._id + 'feesCollection'] = [];

          let feeCollected = 0;
          let feeDues = 0;    
          
          this.props.fees.forEach(fee => {
              
              let paidAmount = 0;
              let dueAmount = 0;

              if(fee.studentName.sectionName === sec._id) {
                fee.feeListings.forEach(feePayment => {
                  paidAmount += feePayment.paid;
                  dueAmount += feePayment.balance;
                });
  
                this.state[sec._id + 'feesCollection'].push({
                  admissionNumber: fee.admissionNumber,
                  studentName: fee.studentName.name,
                  rollNumber: fee.studentName.rollNumber,
                  paidAmount: paidAmount,
                  dueAmount: dueAmount
                });
              }
              

              feeCollected += paidAmount;
              feeDues += dueAmount;
            

          })

          classData.push({
            class: sec.name,
            feeCollected: feeCollected,
            feeDues: feeDues
          })
        });

      }

      form =
        (true) ?
          <Aux>
            <MaterialTable
            style={{ margin: 10, width: '100%', fontSize: '1rem!important' }}
            title={'Fee Report Summary'}
            columns={[
              {
                title: 'Class', field: 'class', type: 'string'
              },
              { title: 'Fee Collected', field: 'feeCollected', type: 'numeric' },
              {
                title: 'Fee Due', field: 'feeDues', type: 'numeric'
              }
            ]}
            data={classData}
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

          { this.props.sections.map(sec => (
              <MaterialTable
              style={{ margin: 10, width: '100%', fontSize: '1rem!important' }}
              title={'Class: ' + sec.name}
              columns={[
                {
                  title: 'Admission Id', field: 'admissionNumber', type: 'string'
                },
                { title: 'Student Name', field: 'studentName', type: 'string' },
                {
                  title: 'Roll Number', field: 'rollNumber', type: 'numeric'
                },
                { title: 'Paid Amount', field: 'paidAmount', type: 'numeric' },
                { title: 'Due Amount', field: 'dueAmount', type: 'numeric' }
              ]}
              data={this.state[sec._id + 'feesCollection']}
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
          )) }
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
          Fees Due / Paid List
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

    
    sections: state.viewSections.users,
    sectionsloading: state.viewSections.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchClassReport: () => dispatch(actions.fetchClassReport()),
    onFetchSections: () => dispatch(actions.fetchSections()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withStyles(styles)(ViewSchoolReport), axios));