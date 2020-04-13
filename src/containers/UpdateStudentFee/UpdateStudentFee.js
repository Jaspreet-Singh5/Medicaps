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

class UpdateStudentFee extends Component {

  state = {
    updateStudentFeeForm: {
      sectionName: {
        elementLabel: 'Section Name',
        elementType: 'select',
        elementConfig: {
          type: 'select',
          placeholder: 'Choose section',
          name: 'sectionName',
          options: []
        },
        value: '',
        validation: {
        },
        valid: true,
        touched: false
      },
      studentName: {
        elementLabel: 'Student Name',
        elementType: 'select',
        elementConfig: {
          type: 'select',
          placeholder: 'Choose Student',
          name: 'studentName',
          options: []
        },
        value: '',
        validation: {
        },
        valid: true,
        touched: false
      },
      monthYear: {
          elementLabel: "From Month",
          elementType: 'text',
          elementConfig: {
              type: 'month',
              name: 'monthYear'
          },
          value: '',
          validation: {
              required: true
          },
          valid: false,
          touched: false
      },
      admissionNumber: {
          elementLabel: "Admission Number",
          elementType: 'text',
          elementConfig: {
              type: 'number',
              placeholder: '26',
              name: 'admissionNumber'
          },
          value: '',
          validation: {
              required: true
          },
          valid: false,
          touched: false
      },
    },
    feesCollection: [],
    formIsValid: false
  }

  componentDidMount() {
    this.props.onFetchClassFees();
    this.props.onFetchSections();
    this.props.onFetchStudents();
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


  inputChangedHandler = (event, inputIdentifier) => {
    const updatedUpdateStudentFeeForm = {
      ...this.state.updateStudentFeeForm
    };
    const updatedFormElement = {
      ...updatedUpdateStudentFeeForm[inputIdentifier]
    }

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true;

    updatedUpdateStudentFeeForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedUpdateStudentFeeForm) {
      formIsValid = updatedUpdateStudentFeeForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ updateStudentFeeForm: updatedUpdateStudentFeeForm, formIsValid: formIsValid });
  }

  render() {

    


    const { classes } = this.props;
    const circle = <div className={clsx(classes.shape, classes.shapeCircle)} />;

    const formElementsArray = [];
    for (let key in this.state.updateStudentFeeForm) {
      formElementsArray.push({
        id: key,
        config: this.state.updateStudentFeeForm[key]
      })
    }

    let form = null;

    
    if (!this.state.loading && this.props.sections && this.props.fees && this.props.students) {

      if (formElementsArray[0].config.elementConfig.options.length === 0) {
        this.props.sections.map(section => {
          formElementsArray[0].config.elementConfig.options.push({
            value: section._id,
            displayValue: section.name
          });
        })
      }

      const studentsArray = [];

      if (this.state.updateStudentFeeForm.sectionName.touched) {
        this.props.students.forEach(student => {
          if (student.sectionName._id === this.state.updateStudentFeeForm.sectionName.value) {
            studentsArray.push(student);
          }
        });
        
        if (formElementsArray[1].config.elementConfig.options.length === 0) {
          studentsArray.map(student => {
            formElementsArray[1].config.elementConfig.options.push({
              value: student._id,
              displayValue: student.name
            });
          })
        } 
      }

      if (this.state.feesCollection.length == 0 && this.state.updateStudentFeeForm.sectionName.touched) {
        this.props.fees.forEach(fee => {
          if(fee.sectionName._id === this.state.updateStudentFeeForm.sectionName.value)
            this.state.feesCollection.push(fee);
        })
      }

      form =
        <form className={classes.UpdateStudentFeeForm}
        >
          {formElementsArray.map(formElement => (
            <Aux>
              <Input
                key={formElement.id}
                id={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                label={formElement.config.elementLabel}>
              </Input>
            </Aux>
          ))}

          {
            (this.state.feesCollection.length !== 0) ?
          <MaterialTable
                style={{ margin: 10, width: '100%', fontSize: '1rem!important' }}
                title={'Attendance'}
                columns={[
                    { title: 'Fee structure', field: 'fee.type', type: 'string' },
                    { title: 'Amount', field: 'amount', type: 'numeric' },
                ]}
                data={this.state.feesCollection[0].allFee}
                editable={{
                  onRowAdd: (newData) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        resolve();
                        this.setState((prevState) => {
                          const feesCollection = [...prevState.feesCollection];
                          const slots = feesCollection[0].allFee;
                          slots.push(newData);
                          feesCollection[0].allFee = slots;
                          return { ...prevState, feesCollection: feesCollection };
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
                            feesCollection[0].allFee[feesCollection[0].allFee.indexOf(oldData)] = newData;
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
              :
              ''
          };
          
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Button
                fullWidth
                style={{ margin: 10 }}
                disabled={!this.state.formIsValid ? true : false}
                type="submit"
                name="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<ArrowForwardIcon />}
                onClick={(e) => this.props.onCreateStudentFee(e, this.state.updateStudentFeeForm , this.state.feesCollection)}
              >
                Update Student Fee
                        </Button>
            </Grid>
          </Grid>
        </form>;
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
        Update Student Fee
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
              color="secondary"
              style={{ width: '100%' }}

            >
              Previous Day
            </Button>
          </Grid>

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
    res: state.createStudentFee.res,
    loading: state.createStudentFee.loading,
    alert: state.createStudentFee.alert,
    error: state.createStudentFee.error,
    
    sections: state.viewSections.users,
    sectionsloading: state.viewSections.loading,
    
    students: state.viewStudents.users,
    
    fees: state.viewClassFees.fees,
    feesloading: state.viewClassFees.loading,
    feesalert: state.viewClassFees.alert,
    feeserror: state.viewClassFees.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateStudentFee: (e, form, feesCollection) => dispatch(actions.createStudentFee(e, form, feesCollection)),
    onFetchSections: () => dispatch(actions.fetchSections()),
    onFetchTeachers: () => dispatch(actions.fetchTeachers()),
    onFetchStudents: () => dispatch(actions.fetchStudents()),
    onFetchClassFees: () => dispatch(actions.fetchClassFees()) 
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withStyles(styles)(UpdateStudentFee), axios));