import React, { Component } from 'react';
import { Textfield, DataTable, TableHeader } from 'react-mdl';
import NumberInput from '../common/NumberInput';

export default class NumericTable extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let { className, label, fields, headerArray } = this.props;
        return (
            <div className={className}>
                <span className='Form-label'>{label}</span>
                <table>
                    <tbody>
                        <tr>
                            {headerArray.map(function(header, i){
                                return <th key={i}>{header}</th>
                            })}
                        </tr>
                        {fields.map(function(field, i){
                            return (
                                <tr key={i}>
                                    <td>{field}</td>
                                    <td><NumberInput label='' className='Form-textInputBox'/></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}