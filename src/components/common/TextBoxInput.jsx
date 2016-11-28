import React, { Component } from 'react';
import { Textfield } from 'react-mdl';
import { setField } from '../../actions/Actions';
import { connect } from 'react-redux';

class TextBoxInput extends Component {
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
        let { className, id, name, rows, value } = this.props;
        let classes = 'Form-textAreaBox ';
        if (className) {
            classes = classes.concat(className);
        }
        rows = parseInt(rows);
        return (
            <div className={classes}>
                <Textfield
                    onChange={this.handleChange.bind(this)}
                    label=''
                    id={id}
                    name={name}
                    value={value}
                    inputClassName={className}
                />
            </div>
        );
    }
}

export default connect(null, { setField })(TextBoxInput);