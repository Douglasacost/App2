import React, { Component } from 'react';
import { Checkbox } from 'react-mdl';


export default class CheckboxInput extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let { className, label, id, options } = this.props;
        let defaultClasses = 'Checkbox-container ';
        let classes = defaultClasses.concat(className);
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