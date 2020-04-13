import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Hoc/Hoc';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Alert, AlertTitle } from '@material-ui/lab';

import axios from '../../axios-admin';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import classes from './CreateFee.css';

const initState = {
    createFeeForm: {
        type: {
            elementLabel: 'Fee Type',
            elementType: 'text',
            elementConfig: {
                type: 'text',
                placeholder: 'Fee Type',
                name: 'type'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        frequency: {
            elementLabel: 'Frequency',
            elementType: 'select',
            elementConfig: {
                type: 'select',
                placeholder: 'Choose frequency',
                name: 'frequency',
                options: [
                    {
                        value: 'monthly',
                        displayValue: 'Monthly' 
                    },
                    {
                        value: 'quaterly',
                        displayValue: 'Quaterly' 
                    },
                    {
                        value: 'session',
                        displayValue: 'Session' 
                    }
                ]
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        status: {
            elementLabel: "Status",
            elementType: 'input',
            elementConfig: {
                type: 'checkbox',
                checked: 'checked',
                name: 'address'
            },
            value: 'Active',
            validation: {
                required: false
            },
            valid: false,
            touched: false
        }
    },
    formIsValid: false
};

class CreateFee extends Component {

    state = initState;

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
        const updatedCreateFeeForm = {
            ...this.state.createFeeForm
        };
        const updatedFormElement = {
            ...updatedCreateFeeForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;

        updatedCreateFeeForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedCreateFeeForm) {
            formIsValid = updatedCreateFeeForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({ createFeeForm: updatedCreateFeeForm, formIsValid: formIsValid });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.createFeeForm) {
            formElementsArray.push({
                id: key,
                config: this.state.createFeeForm[key]
            })
        }

        let form = null;

        // error fixed
        if (!this.props.loading) {
            form =
                <form className={classes.CreateFeeForm}
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
                                onClick={(e) => this.props.onCreateFee(e, this.state.createFeeForm)}
                            >
                                Create Fee
                        </Button>
                        </Grid>
                    </Grid>
                </form>;
        } else {
            form = <Spinner></Spinner>
        }

        let alert = null;
        if (this.props.alert === 'success') {
            alert =
                <Alert severity="success" style={{ width: '50%', marginRight: 'auto', marginLeft: 'auto' }}>
                    <AlertTitle>Success</AlertTitle>
                    Fee type created successfully
            </Alert>;
        } else if (this.state.alert === 'failure') {
            alert =
                <Alert severity="error" style={{ width: '50%', marginRight: 'auto', marginLeft: 'auto' }}>
                    <AlertTitle>Error</AlertTitle>
                    {this.props.error}
          </Alert>;
        }

        return (
            <Aux>
                <Grid container spacing={3}>
                    <Grid item xs={5} className={classes.LeftGrid}>

                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant="h2" gutterBottom style={{ marginTop: '15vh', textAlign: 'center', textTransform: 'uppercase' }}>
                            Create a Fee Type
                        </Typography>
                        {alert}
                        {form}
                        
                    </Grid>
                </Grid>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        res: state.createFee.res,
        loading: state.createFee.loading,
        alert: state.createFee.alert,
        error: state.createFee.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateFee: (e, form) => dispatch(actions.createFee(e, form))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler((CreateFee), axios));
