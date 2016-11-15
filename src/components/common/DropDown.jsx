import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Textfield } from 'react-mdl';
import { setField } from '../../actions/Actions';

class Dropdown extends Component {
    constructor(props) {
        super(props);
    }
    handleClick(name){
        console.log(name);
        this.props.setField(this.props.form, this.props.input, name);
    }
    render() {
        let { className, form, input, name, options, selected } = this.props;
        let handleClick = this.handleClick.bind(this);
        return (
            <div className="mui-dropdown">
                <button className="mui-btn mui-btn--primary" data-mui-toggle="dropdown">
                    { (selected === '') ?
                        'Selecciones'
                        :
                        selected
                    }
                    <span className="mui-caret"></span>
                </button>
                <ul className="mui-dropdown__menu">
                    {options.map((option, i) => {
                        console.log(option);
                        return <li key={i} onClick={handleClick.bind(this, option.Title)}>{option.Title}</li>;
                    })}
                </ul>
            </div>
        );
    }
}

export default connect(null, { setField })(Dropdown);