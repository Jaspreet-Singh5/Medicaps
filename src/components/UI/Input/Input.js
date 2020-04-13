import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import MaterialTable from 'material-table';


import classes from './Input.css';
import Aux from '../../../hoc/Hoc/Hoc';

const input = props => {

    
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    } else if (props.touched) {
        inputClasses.push(classes.Valid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement =
                <Input
                    {...props.elementConfig}
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}
                    fullWidth
                    style={{ margin: 10 }}
                    variant="filled"
                >
                </Input>
            break;
        case 'text':
            inputElement =
                <TextField
                    type={props.elementType}
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                    label={props.label}
                    style={{ margin: 10 }}
                    fullWidth
                    margin="normal"
                    id={props.id}
                    variant="filled"
                />;
            break;
        // case 'date':
        //     inputElement = 
        //         <MuiPickersUtilsProvider utils={DateFnsUtils}>
        //             <KeyboardDatePicker
        //                 style={{ margin: 10 }}
        //                 disableToolbar
        //                 variant="inline"
        //                 format="MM/dd/yyyy"
        //                 margin="normal"
        //                 id="date-picker-inline"
        //                 label="Date picker inline"    
        //                 value={props.value}
        //                 onChange={props.changed}
        //                 KeyboardButtonProps={{
        //                 'aria-label': 'change date',
        //                 }}
        //             />
        //         </MuiPickersUtilsProvider>
        //     break;
        case ('textarea'):
            inputElement =
                <TextField
                    multiline
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                    id={props.id}
                    variant="filled"
                    label={props.label}
                    style={{ margin: 10 }}
                    fullWidth
                    margin="normal"
                />;
            break;
        case ('select'):
            inputElement =
                <Aux classes={classes.marginControl}>
                    <InputLabel
                        className={classes.Label}
                        style={{ display: 'inline', color: '#000000', fontSize: '1.4rem', marginTop: '1rem', marginLeft: '1rem' }}>{props.label}</InputLabel>
                    <Select
                        multiple={props.elementConfig.multiple ? true : false}
                        style={{ marginLeft: 20 }}
                        variant="filled"
                        native
                        className={inputClasses.join(' ')}
                        value={props.value}
                        onChange={props.changed}
                        inputProps={{
                            name: '',
                            id: '',
                        }}
                        style={{ width: '100%', margin: 10 }}
                    >
                        {props.elementConfig.options.map(option => (
                            <option
                                key={option.value}
                                value={option.value}>{option.displayValue}</option>
                        ))}
                    </Select>
                </Aux>

            break;
        case ('radio'):
            inputElement =
                <Aux classes={classes.marginControl}>
                    <InputLabel
                        className={classes.Label}
                        style={{ display: 'inline', color: '#000000', fontSize: '1.4rem', marginLeft: '1rem', marginTop: '2rem' }}>{props.label}</InputLabel>

                    <div className={classes.radioContainer}>
                        <input id="toggle-on" className={classes.toggle + ' ' + classes.toggleLeft} name="toggle" value="false" type="radio" checked />
                        <label htmlFor="toggle-on" className={classes.btn}>Yes</label>
                        <input id="toggle-off" className={classes.toggle + ' ' + classes.toggleRight} name="toggle" value="true" type="radio" />
                        <label htmlFor="toggle-off" className={classes.btn}>No</label>
                    </div>
                </Aux>;
            break;
        // case 'timetable':
        //     inputElement =
        //         <Aux>
        //             {
                        
        //                 props.elementConfig.timetableDetails.map((timetableDetail, i) => (
        //                     <MaterialTable
        //                         style={{ margin: 10, width: '100%', fontSize: '1rem!important' }}
        //                         title={timetableDetail.dayName.toUpperCase()}
        //                         columns={props.elementConfig.columns}
        //                         data={props[timetableDetail.dayName + 'Slots']}
        //                         editable={{
        //                             onRowAdd: (newData) =>
        //                                 new Promise((resolve) => {
        //                                     setTimeout(() => {
        //                                         resolve();
        //                                         this.setState((prevState) => {
        //                                             const name = timetableDetail.dayName + 'Slots';
        //                                             const slots = [...prevState[name]];
        //                                             slots.push(newData);
        //                                             return { ...prevState, [name]: slots };
        //                                         });
        //                                     }, 600);
        //                                 }),
        //                             onRowUpdate: (newData, oldData) =>
        //                                 new Promise((resolve) => {
        //                                     setTimeout(() => {
        //                                         resolve();
        //                                         if (oldData) {
        //                                             this.setState((prevState) => {
        //                                                 const name = timetableDetail.dayName + 'Slots';
        //                                                 const slots = [...prevState[name]];
        //                                                 slots[slots.indexOf(oldData)] = newData;
        //                                                 return { ...prevState, [name]: slots };
        //                                             });
        //                                         }
        //                                     }, 600);
        //                                 }),
        //                             onRowDelete: (oldData) =>
        //                                 new Promise((resolve) => {
        //                                     setTimeout(() => {
        //                                         resolve();
        //                                         this.setState((prevState) => {
        //                                             const name = timetableDetail.dayName + 'Slots';
        //                                             const slots = [...prevState[name]];
        //                                             slots.splice(slots.indexOf(oldData), 1);
        //                                             return { ...prevState, [name]: slots };
        //                                         });
        //                                     }, 600);
        //                                 }),
        //                         }}
        //                     />
        //                 ))
        //             }
        //         </Aux>
        //     break;

        case ('select2'):
            inputElement =
                <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '1rem', marginTop: '2rem', width: '100.4%' }}>
                    <InputLabel
                        className={classes.Label}
                        style={{ display: 'inline', color: '#000000', fontSize: '1.4rem', marginLeft: '1rem', marginTop: '2rem' }}>{props.label}</InputLabel>

                    <Select
                        native
                        className={inputClasses.join(' ')}
                        value={props.value}
                        onChange={props.changed}
                        inputProps={{
                            name: '',
                            id: '',
                        }}
                        style={{ width: '48%' }}
                    >
                        {props.elementConfig.options1.map(option => (
                            <option
                                key={option.value}
                                value={option.value}>{option.displayValue}</option>
                        ))}
                    </Select>

                    <Select
                        native
                        className={inputClasses.join(' ')}
                        value={props.value}
                        onChange={props.changed}
                        inputProps={{
                            name: '',
                            id: '',
                        }}
                        style={{ width: '48%' }}
                    >
                        {props.elementConfig.options2.map(option => (
                            <option
                                key={option.value}
                                value={option.value}>{option.displayValue}</option>
                        ))}
                    </Select>
                </div>
                ;
            break;
        default:
            inputElement = ''
    }

    return (
        <div className={classes.Input} style={{ textAlign: 'left' }}>
            <FormControl className={classes.formControl} style={{ width: '100%' }}>
                {inputElement}
            </FormControl>
        </div>
    );
}

export default input;
