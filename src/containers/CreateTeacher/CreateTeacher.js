import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import MaterialTable from 'material-table';

import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Hoc/Hoc';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Alert, AlertTitle } from '@material-ui/lab';

import axios from '../../axios-admin';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import classes from './CreateTeacher.css';

const initState = {
    createTeacherForm: {
        name: {
            elementLabel: 'Name',
            elementType: 'text',
            elementConfig: {
                type: 'text',
                placeholder: 'Satyajit',
                name: 'name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        fatherOrSpouseName: {
            elementLabel: "Father's/Spouse's name",
            elementType: 'text',
            elementConfig: {
                type: 'text',
                placeholder: 'Manohar',
                name: 'fatherOrSpouseName'
            },
            value: '',
            validation: {
                required: false
            },
            valid: false,
            touched: false
        },
        address: {
            elementLabel: "Address",
            elementType: 'textarea',
            elementConfig: {
                rows: 5,
                placeholder: 'Nehru park',
                name: 'address'
            },
            value: '',
            validation: {
                required: false
            },
            valid: false,
            touched: false
        },
        dob: {
            elementLabel: "D.O.B.",
            elementType: 'text',
            elementConfig: {
                type: 'date',
                placeholder: '12-06-17',
                name: 'dob'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        aadharNumber: {
            elementLabel: "Aadhar Number",
            elementType: 'text',
            elementConfig: {
                type: 'text',
                placeholder: '784564545645',
                name: 'aadharNumber'
            },
            value: '',
            validation: {
                required: false
            },
            valid: false,
            touched: false
        },
        accountNumber: {
            elementLabel: "Account number",
            elementType: 'text',
            elementConfig: {
                type: 'text',
                placeholder: '784564545645',
                name: 'accountNumber'
            },
            value: '',
            validation: {
                required: false
            },
            valid: false,
            touched: false
        },
        // Needs to be updated
        photo: {
            elementLabel: "Photo",
            elementType: 'text',
            elementConfig: {
                type: 'text',
                placeholder: 'asasd.jpeg',
                name: 'photo'
            },
            value: '',
            validation: {
                required: false
            },
            valid: false,
            touched: false
        },
        email: {
            elementLabel: 'E-mail',
            elementType: 'text',
            elementConfig: {
                type: 'text',
                placeholder: 'abcd@gmail.com',
                name: 'email'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        dateOfJoining: {
            elementLabel: "Date of Joining",
            elementType: 'text',
            elementConfig: {
                type: 'date',
                placeholder: '12-06-17',
                name: 'dateOfJoining'
            },
            value: '',
            validation: {
                required: false
            },
            valid: false,
            touched: false
        },
        password: {
            elementLabel: 'Password',
            elementType: 'text',
            elementConfig: {
                type: 'password',
                placeholder: 'password',
                name: 'password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        },
        positionOfResponsibility: {
            elementLabel: "Position Of Responsibility",
            elementType: 'text',
            elementConfig: {
                type: 'text',
                placeholder: 'Head',
                name: 'positionOfResponsibility'
            },
            value: '',
            validation: {
                required: false
            },
            valid: false,
            touched: false
        },
        education: {
            elementLabel: "Education",
            elementType: 'text',
            elementConfig: {
                type: 'text',
                placeholder: 'XI',
                name: 'Education'
            },
            value: '',
            validation: {
                required: false
            },
            valid: false,
            touched: false
        },
        salary: {
            elementLabel: "Salary",
            elementType: 'text',
            elementConfig: {
                type: 'text',
                placeholder: '665656',
                name: 'salary'
            },
            value: '',
            validation: {
                required: false
            },
            valid: false,
            touched: false
        },
        SSSMID: {
            elementLabel: "SSSMID",
            elementType: 'text',
            elementConfig: {
                type: 'text',
                placeholder: 'afasf66',
                name: 'SSSMID'
            },
            value: '',
            validation: {
                required: false
            },
            valid: false,
            touched: false
        }
    },
    formIsValid: false
};

class CreateTeacher extends Component {

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
        const updatedCreateTeacherForm = {
            ...this.state.createTeacherForm
        };
        const updatedFormElement = {
            ...updatedCreateTeacherForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;

        updatedCreateTeacherForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedCreateTeacherForm) {
            formIsValid = updatedCreateTeacherForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({ createTeacherForm: updatedCreateTeacherForm, formIsValid: formIsValid });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.createTeacherForm) {
            formElementsArray.push({
                id: key,
                config: this.state.createTeacherForm[key]
            })
        }

        let form = null;

        // error fixed
        if (!this.props.loading) {
            form =
                <form className={classes.CreateTeacherForm}
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
                                onClick={(e) => this.props.onCreateTeacher(e, this.state.createTeacherForm)}
                            >
                                Create Teacher
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
                    Teacher created successfully
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
                            Create a Teacher
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
        res: state.createTeacher.res,
        loading: state.createTeacher.loading,
        alert: state.createTeacher.alert,
        error: state.createTeacher.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateTeacher: (e, form) => dispatch(actions.createTeacher(e, form))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler((CreateTeacher), axios));
