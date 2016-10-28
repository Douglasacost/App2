import React, { Component } from 'react';


export default class RadioInput extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let defaultClasses = '';
        let className = this.props.className;
        let classes = defaultClasses.concat(className);
        let id = this.props.id;
        let label = this.props.label;
        let name = this.props.name;
        return (
            <div ref={(container) => this.container = container} id={id} className={classes}>
                <span className='Form-dateLabel'>{label}</span>
                <label ref={(yesLabel) => this.yesLabel = yesLabel} className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor="option-1">
                    <input type="radio" id="option-1" className="mdl-radio__button" name={name} value="si" defaultChecked></input>
                    <span ref={(yesSpan) => this.yesSpan = yesSpan} className="mdl-radio__label">Si</span>
                </label>
                <label ref={(noLabel) => this.noLabel = noLabel} className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor="option-2">
                    <input type="radio" id="option-2" className="mdl-radio__button" name={name} value="no"></input>
                    <span ref={(noSpan) => this.noSpan = noSpan} className="mdl-radio__label">No</span>
                </label>
            </div>
        );
    }
}