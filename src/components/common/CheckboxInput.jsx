import React, { Component } from 'react';
import { Checkbox } from 'react-mdl';


export default class CheckboxInput extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let defaultClasses = 'Checkbox-container ';
        let className = this.props.className;
        let classes = defaultClasses.concat(className);
        let label = this.props.label;
        let id = this.props.id;
        let options = this.props.options;
        return (
            <div className={classes}>
                { (options) &&
                    <span className='Checkbox-label'>{label}</span>
                }
                <div className='Checkbox-options'>
                    { (options) &&
                        options.map(function(option, i){
                            return <Checkbox label={option.label} id={option.id} key={i} ripple />;
                        })
                    }
                    { (!options) &&
                        <Checkbox label={label} id={id} ripple />
                    }
                </div>
            </div>
        );
    }
}