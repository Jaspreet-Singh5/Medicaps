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

class CreateClassFee extends Component {

  state = {
    createClassFeeForm: {
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
    this.props.onFetchFees();
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

inputChangedHandler = (event, inputIdentifier) => {
  const updatedCreateClassFeeForm = {
      ...this.state.createClassFeeForm
  };
  const updatedFormElement = {
      ...updatedCreateClassFeeForm[inputIdentifier]
  }

  updatedFormElement.value = event.target.value;
  updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
  updatedFormElement.touched = true;

  updatedCreateClassFeeForm[inputIdentifier] = updatedFormElement;

  let formIsValid = true;
  for (let inputIdentifier in updatedCreateClassFeeForm) {
      formIsValid = updatedCreateClassFeeForm[inputIdentifier].valid && formIsValid;
  }

  this.setState({ createClassFeeForm: updatedCreateClassFeeForm, formIsValid: formIsValid });
}


  
  render() {

    const { classes } = this.props;
    const circle = <div className={clsx(classes.shape, classes.shapeCircle)} />;

    const formElementsArray = [];
    for (let key in this.state.createClassFeeForm) {
      formElementsArray.push({
        id: key,
        config: this.state.createClassFeeForm[key]
      })
    }

    let form = null;
    if (!this.state.loading && this.props.fees && this.props.sections ) {

      if (formElementsArray[0].config.elementConfig.options.length === 0) {
        this.props.sections.map(section => {
          formElementsArray[0].config.elementConfig.options.push({
            value: section._id,
            displayValue: section.name
          });
        })
      }
      
      console.log("SDfsd");

      if (this.state.feesCollection.length == 0) {
        this.props.fees.map(fee => {
          this.state.feesCollection.push(fee);
        })
      }

        form = 
          <form className={classes.CreateClassFeeForm}
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

          { (this.state.feesCollection.length !== 0) ?
          <MaterialTable
                style={{ margin: 10, width: '100%', fontSize: '1rem!important' }}
                title={'Fee Types'}
                columns={[
                    { title: 'Fee type', field: 'type', text: 'text'
                    },
                    { title: 'Frequency', field: 'frequency', type: 'text' },
                    { title: 'Status', field: 'status', type: 'boolean' },
                    { title: 'Amount', field: 'amount', type: 'numeric' },
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
              :
              ''
          }

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
                onClick={(e) => this.props.onCreateClassFee(e, this.state.createClassFeeForm, this.state.feesCollection)}
              >
                Create Class Fee
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
          Create Class Fee
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
    fees: state.viewFees.fees,
    viewLoading: state.viewFees.loading,
    sections: state.viewSections.users,
    sectionsloading: state.viewSections.loading,
    alert: state.createClassFee.alert,
    error: state.createClassFee.error,
    res: state.createClassFee.res,
    loading: state.createClassFee.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchFees: () => dispatch(actions.fetchFees()), 
    onFetchSections: () => dispatch(actions.fetchSections()),
    onCreateClassFee: (e, form, feesCollection) => dispatch(actions.createClassFee(e, form, feesCollection))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withStyles(styles)(CreateClassFee), axios));