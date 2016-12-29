import React, { Component } from 'react';
import TextInput from '../common/TextInput';
import DateInput from '../common/DateInput';
import RadioInput from '../common/RadioInput';
import Notes from '../common/Notes';
import CheckboxInput from '../common/CheckboxInput';
import Dropdown from '../common/Dropdown';

const radioSample = [ 'A', 'B'];
const footNotes = [
        {
            text: 'example note1'
        },
        {
            text: 'example note2'
        },
        {
            text: 'example note3'
        }
];
const fieldsToVerify = ['verify1', 'veridy2'];
const dropOptions = ['option1', 'option2'];

export default class ComponentB extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.getData();
    }
    getData() {
        //call get data module or write function
    }
    handlePost(){
        //call post data module or write function
    }
    handleSubmit(e){
        e.preventDefault();
        verifyRequiredInstance.verify(fieldsToVerify, this.props.state, this.handlePost.bind(this));
    }
    handlePrint(e){
        e.preventDefault();
        window.focus();
        window.print();
    }
    render() {
        let { state, user } = this.props;
        return (
            <div className='MainScreen'>
                <RadioInput 
                    label='' 
                    name='radioSample'
                    id='radioSample'
                    form={form}
                    selected={state.get('radioSample')}
                    options={radioSample}/>
                <TextInput label='Sample text input' value={state.get('textInput')} id='textInput' location={location} className=''/>
                <CheckboxInput 
                    className='Checkbox-container--singleOption'
                    label='Sample checkbox'
                    id='checkboxSample'
                    value={state.get('checkboxSample')} 
                    location={location}/>
                <Dropdown options={dropOptions} label='Sample dropdown' selected={state.get('dropdown')} input='dropdown' location={location} />
                <DateInput className='DateInput' label='sample date selection:' stringDate={state.get('sampleDate')} location={location} input='sampleDate' disabled={false} />
                <Notes notes={footNotes}/>
                <button className="mui-btn mui-btn--primary" onClick={this.handleSubmit.bind(this)}>Enviar</button>
                <button className="mui-btn mui-btn--primary printButton" onClick={this.handlePrint.bind(this)}>Imprimir</button>
            </div>
        );
    }
}