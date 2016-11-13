import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Textfield } from 'react-mdl';
import { setField } from '../../actions/Actions';

class TextInput extends Component {
    constructor(props) {
        super(props);
    }
    handleChange(){
        console.log('changed');
        let form = this.props.form,
            input = this.props.id,
            value = document.getElementById(this.props.id).value;
        console.log(value);
        this.props.setField(form, input, value);
    }
    render() {
        let { className, id, label, name, value } = this.props;
        return (
            <div className={className}>
                <Textfield
                    onChange={this.handleChange.bind(this)}
                    label={label}
                    id={id}
                    name={name}
                    value={value}
                    floatingLabel
                />
            </div>
        );
    }
}

export default connect(null, { setField })(TextInput);