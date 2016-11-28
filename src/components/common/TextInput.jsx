import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Textfield } from 'react-mdl';
import { setField } from '../../actions/Actions';

class TextInput extends Component {
    constructor(props) {
        super(props);
    }
    handleChange(){
        let form = this.props.form,
            input = this.props.id,
            value = document.getElementById(this.props.id).value;
        this.props.setField(form, input, value);
    }
    render() {
        let { className, id, label, name, value, disabled } = this.props;
        let disabledVal;
        if(disabled !== undefined && disabled !== null){
            disabledVal = disabled;
        } else {
            disabledVal = false;
        }
        return (
            <div className={className}>
                <Textfield
                    onChange={this.handleChange.bind(this)}
                    label={label}
                    id={id}
                    name={name}
                    value={value}
                    floatingLabel
                    disabled={disabledVal}
                />
            </div>
        );
    }
}

export default connect(null, { setField })(TextInput);