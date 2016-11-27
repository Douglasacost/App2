import React, { Component } from 'react';
import NumberInput from '../common/NumberInput';
import { Textfield } from 'react-mdl';

export default class NumericTable extends Component {
    constructor(props) {
        super(props);
    }
    netVal(value){
        let number = parseInt(value);
        let processed = (isNaN(number)) ? 0 : number;
        return processed ;
    }
    render() {
        let { className, label, fields, headerArray, form, state } = this.props;
        let totalValue = 0;
        let netVal = this.netVal;
        fields.map(function(field, i){
            let id = field.id;
            totalValue += netVal(state.get(id));
        });
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
                        <tr>
                            <td>Total</td>
                            <td><Textfield
                                    onChange={() =>{}}
                                    label=''
                                    id=''
                                    name=''
                                    value={(totalValue === 0) ? '' : totalValue}
                                    floatingLabel
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}