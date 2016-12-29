import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setField } from '../../actions/Actions';

class Dropdown extends Component {
    constructor(props) {
        super(props);
    }
    handleClick(name){
        this.props.setField(this.props.location, this.props.input, name);
    }
    render() {
        let { className, location, input, name, options, selected, label, disabled } = this.props;
        let handleClick = this.handleClick.bind(this);
        return (
            <div className='Dropdown-container'>
                <span className='Dropdown-label'>{label}</span>
                <div className="mui-dropdown">
                    <button className="mui-btn mui-btn--primary" data-mui-toggle="dropdown">
                        { (selected === '') ?
                            'Text'
                            :
                            selected
                        }
                        <span className="mui-caret"></span>
                    </button>
                    { (!disabled) &&
                        <ul className="mui-dropdown__menu Dropdown-scroll">
                            {options.map((option, i) => {
                                return <li key={i} onClick={handleClick.bind(this, option.Title)}>{option.Title}</li>;
                            })}
                        </ul>    
                    }
                </div>
            </div>
        );
    }
}

export default connect(null, { setField })(Dropdown);