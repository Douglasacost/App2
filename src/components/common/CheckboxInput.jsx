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
        let id = this.props.id;
        let label = this.props.label;
        let options = this.props.options;
        return (
            <div className={classes}>
                { (options) &&
                    <span className='Checkbox-label'>{label}</span>
                }
                <div className='Checkbox-options'>
                    { (options) &&
                        options.map(function(option, i){
                            return <Checkbox label={option} key={i} ripple />;
                        })
                    }
                    { (!options) &&
                        <Checkbox label={label} ripple />
                    }
                </div>
            </div>
        );
    }
}