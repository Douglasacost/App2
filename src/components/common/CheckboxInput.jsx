import React, { Component } from 'react';
import { Checkbox } from 'react-mdl';
import { connect } from 'react-redux';
import { setField } from '../../actions/Actions';

class CheckboxInput extends Component {
    constructor(props) {
        super(props);
    }
    handleChange(){
        let form = this.props.form,
            input = this.props.id,
            value = (this.props.value === 'si') ? 'no' : 'si' ;
        this.props.setField(form, input, value);
    }
    render() {
        let { className, label, id, options, input, form, value } = this.props;
        let defaultClasses = 'Checkbox-container ';
        let classes = defaultClasses.concat(className);
        let handleChange = this.handleChange.bind(this);
        let checked;
        (value === 'si') ? checked = true : checked = false
        return (
            <div className={classes}>
                <Checkbox label={label} id={id} ripple onChange={handleChange} checked={checked}/>
            </div>
        );
    }
}

export default connect(null, { setField })(CheckboxInput);