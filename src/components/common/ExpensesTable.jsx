import React, { Component } from 'react';
import TextInput from '../common/TextInput';
import CheckboxInput from '../common/CheckboxInput';
import DateInput from '../common/DateInput';

export default class ExpensesTable extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let { className, label, date, form } = this.props;
        var tableFields = []; 
        var rows = [];
        for (var i=0; i < 6; i++) {
            var index = i + 1 ;
            tableFields.push(
                <td key={index}><TextInput label='' className='Table-textInputBox'/></td>
            );
        }
        for (var i=0; i < 19; i++) {
            var index = i + 1 ;
            rows.push(
                <tr key={index}>
                    <td><DateInput className='' label='' date={date} form={form} input='date'/></td>
                    {tableFields}
                </tr>
            );
        }
        return (
            <div className={className}>
                <span className='Form-label'>{label}</span>
                <table>
                    <tbody>
                        <tr>
                            <th colSpan="4" scope="colgroup">DETALLE DE COLICITUD / FACTURA</th>
                            <th colSpan="3" scope="colgroup">CONVERSION MONEDAS</th>
                        </tr>
                        <tr>
                            <th>FECHA</th>
                            <th>FACTURA</th>
                            <th>PAIS</th>
                            <th>DESCRIPCION GASTO**</th>
                            <th>T/C</th>
                            <th>OTRA MONEDA</th>
                            <th>TOTAL</th>
                        </tr>
                        {rows}
                        <tr>
                            <td colSpan='5'>TOTALES</td>
                            <td>test</td>
                            <td>test</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}