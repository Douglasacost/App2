import React, { Component } from 'react';
import NumberInput from '../common/NumberInput';

export default class NumericTable extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let { className, label, fields, headerArray } = this.props;
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
                            return (
                                <tr key={i}>
                                    <td>{field}</td>
                                    <td><NumberInput label='' className='Table-textInputBox'/></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}