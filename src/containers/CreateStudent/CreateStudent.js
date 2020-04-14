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
import classes from './CreateStudent.css';

const initState = {
    createStudentForm: {
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
            errMessage: '',
            touched: true
        },
        sectionName: {
            elementLabel: "Section",
            elementType: 'select',
            elementConfig: {
                type: 'select',
                placeholder: 'Choose section',
                name: 'sectionName',
                options: [
                    
                ]
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            errMessage: '',
            touched: true
        },
        fatherName: {
            elementLabel: "Father Name",
            elementType: 'text',
            elementConfig: {
                placeholder: 'Nehru',
                name: 'fatherName'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            errMessage: '',
            touched: true
        },
        motherName: {
            elementLabel: "Mother Name",
            elementType: 'text',
            elementConfig: {
                placeholder: 'Neha',
                name: 'motherName'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            errMessage: '',
            touched: true
        },
        address: {
            elementLabel: "Address",
            elementType: 'textarea',
            elementConfig: {
                type: 'address',
                rows: 5,
                placeholder: 'Nehru park',
                name: 'address'
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            errMessage: '',
            touched: true
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
            errMessage: '',
            touched: true
        },
        aadharNumber: {
            elementLabel: "Aadhar Number",
            elementType: 'text',
            elementConfig: {
                type: 'number',
                placeholder: '9862649867986248',
                name: 'aadharNumber'
            },
            value: '',
            validation: {
                required: false,
                maxLength: 16,
                minLength: 16,
            },
            valid: true,
            errMessage: '',
            touched: true
        },
        accountNumber: {
            elementLabel: "Account Number",
            elementType: 'text',
            elementConfig: {
                type: 'number',
                placeholder: '9862649867986248',
                name: 'accountNumber'
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            errMessage: '',
            touched: true
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
            valid: true,
            errMessage: '',
            touched: true
        },
        enrollmentNumber: {
            elementLabel: 'Enrollment Number',
            elementType: 'text',
            elementConfig: {
                type: 'number',
                placeholder: '4364363634',
                name: 'enrollmentNumber'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            errMessage: '',
            touched: true
        },
        rollNumber: {
            elementLabel: 'Roll Number',
            elementType: 'text',
            elementConfig: {
                type: 'number',
                placeholder: '1242',
                name: 'rollNumber'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            errMessage: '',
            touched: true
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
                minLength: 6,
                maxLength: 20
            },
            valid: false,
            errMessage: '',
            touched: true
        },
        SSSMID: {
            elementLabel: "SSSMID",
            elementType: 'text',
            elementConfig: {
                type: 'number',
                placeholder: '664646',
                name: 'SSSMID'  
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            errMessage: '',
            touched: true
        }
    },
    formIsValid: false,
    formValAlert: ''
};

class CreateStudent extends Component {

    componentDidMount() {
        this.props.onFetchSections();
    }

    state = initState;

    checkValidity = (value, inputName, rules) => {
        let isValid = true;
        let errMessage = '';

        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
            errMessage += !(value.trim() !== '') ? `${inputName} is required. ` : '';
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
            errMessage += !(value.length >= rules.minLength) ? `${inputName} should have a minimum length of ${rules.minLength}. ` : '';
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
            errMessage += !(value.length <= rules.maxLength) ? `${inputName} should have a maximum length of ${rules.maxLength}. ` : '';
        }

        return {
            isValid: isValid,
            errMessage: errMessage
        };
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedCreateStudentForm = {
            ...this.state.createStudentForm
        };
        const updatedFormElement = {
            ...updatedCreateStudentForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        const { isValid, errMessage } = this.checkValidity(updatedFormElement.value, updatedFormElement.elementLabel, updatedFormElement.validation);
        updatedFormElement.valid = isValid; 
        updatedFormElement.errMessage = errMessage;
        updatedFormElement.touched = true;

        updatedCreateStudentForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedCreateStudentForm) {
            formIsValid = updatedCreateStudentForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({ createStudentForm: updatedCreateStudentForm, formIsValid: formIsValid });
    }

    validation = (e, formElementsArray) => {
        e.preventDefault();

        if (this.state.formIsValid) {
            this.props.onCreateStudent(e, this.state.createStudentForm);
            
            this.setState({
                ...this.state,
                ...initState
            })
            
        }
        else {
            let err = '';

            err = 
                formElementsArray.map((formElement) => (
                    <div>
                        {formElement.config.errMessage}
                    </div>
                ));

            this.setState({
                ...this.state,
                formValAlert: err
            })
        }
    }

    render() {
        
        

        const formElementsArray = [];
        for (let key in this.state.createStudentForm) {
            formElementsArray.push({
                id: key,
                config: this.state.createStudentForm[key]
            })
        }

        // console.log(formElementsArray)

        let form = null;

        // error fixed #1/1
        if (!this.props.loading && this.props.sections) {

            if(formElementsArray[1].config.elementConfig.options.length === 0) {
                this.props.sections.map(section => {
                    formElementsArray[1].config.elementConfig.options.push({
                        value: section._id,
                        displayValue: section.name
                    });

                    formElementsArray[1].config.value = section._id;
                })
            }
            
            form =
                <form className={classes.CreateStudentForm}
                >
                    {formElementsArray.map(formElement => (
                        <Aux
                            key={formElement.id}
                            id={formElement.id}>
                            <Input
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
                                type="submit"
                                name="submit"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                endIcon={<ArrowForwardIcon />}
                                onClick={(e) => this.validation(e, formElementsArray)}
                            >
                                Create Student
                        </Button>
                        </Grid>
                    </Grid>
                </form>;
        } else {
            form = <Spinner></Spinner>
        }

        let alert = null;
        if (this.props.alert === 'success' && this.props.res) {
            alert =
                <Alert severity="success" style={{ width: '50%', marginRight: 'auto', marginLeft: 'auto' }}>
                    <AlertTitle>Success</AlertTitle>
                    Student created successfully
            </Alert>;
        } else if (this.props.alert === 'success' && this.props.res === undefined) {
            alert =
                <Alert severity="error" style={{ width: '50%', marginRight: 'auto', marginLeft: 'auto' }}>
                    <AlertTitle>Form submission Error</AlertTitle>
                    Something went wrong.
          </Alert>;
        }

        let formValAlert = '';
        if (this.state.formValAlert) {
            formValAlert =
                <Alert severity="error" style={{ width: '50%', marginRight: 'auto', marginLeft: 'auto' }}>
                    <AlertTitle>Form validation Error</AlertTitle>
                    {this.state.formValAlert}
            </Alert>;
        }

        return (
            <Aux>
                <Grid container>
                    <Grid item xs={5} className={classes.LeftGrid}>

                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant="h2" gutterBottom style={{ marginTop: '15vh', textAlign: 'center', textTransform: 'uppercase' }}>
                            Create a Student
                        </Typography>
                        {formValAlert}
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
        res: state.createStudent.res,
        loading: state.createStudent.loading,
        alert: state.createStudent.alert,
        error: state.createStudent.error,
        sections: state.viewSections.users      
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateStudent: (e, form) => dispatch(actions.createStudent(e, form)),
        onFetchSections: () => dispatch(actions.fetchSections())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)((CreateStudent));
