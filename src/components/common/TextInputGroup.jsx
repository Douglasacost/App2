import React, { Component } from 'react';
import { Textfield } from 'react-mdl';

export default class TextInput extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let { className, label, fields } = this.props;
        return (
            <div>
                { (fields) && 
                    fields.map(function(field, i){
                            return <Textfield onChange={() => {}} label={field} key={i} inputClassName={} floatingLabel />;
                        })
                }
            </div>
        );
    }
}