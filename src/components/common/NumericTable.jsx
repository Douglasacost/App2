import React, { Component } from 'react';
import NumberInput from '../common/NumberInput';

export default class NumericTable extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let { className, label, fields, headerArray, form, state } = this.props;
        return (
            <div className={className}>
                <span className='Table-label'>{label}</span>
                <table>
                    <tbody>
                        <tr>
                            {headerArray.map(function(header, i){
                                return <th key={i}>{header}</th>
                            })}
                        </tr>
                        {fields.map(function(field, i){
                            let label = field.label;
                            let id = field.id;
                            return (
                                <tr key={i}>
                                    <td>{field.label}</td>
                                    <td><NumberInput label='' id={id} value={state.get(id)} className='Form-textInputBox' form={form}/></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}