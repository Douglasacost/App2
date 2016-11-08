import React, { Component } from 'react';
import TextInput from '../common/TextInput';
import CheckboxInput from '../common/CheckboxInput';

export default class SubsidiaryTable extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let { className, label } = this.props;
        var tableFields = []; 
        var rows = [];
        for (var i=0; i < 8; i++) {
            var index = i + 1 ;
            tableFields.push(
                <td key={index}><TextInput label='' className='Table-textInputBox'/></td>
            );
        }
        for (var i=0; i < 12; i++) {
            var index = i + 1 ;
            rows.push(
                <tr key={index}>
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
                            <th>Nombre</th>
                            <th>Cargo en la Organizacion</th>
                            <th>El solicitante es un empleado del Gobierno?</th>
                            <th>Rol o Cargo en el Gobierno</th>
                            <th>El HCP en su rol o cargo en el Gobierno, ¿Tiene influencia individual o toma decisiones relacionadas con la compra, la inclusión de los productos en los formularios, las políticas de salud, registro de productos, o cualquier otro que pueda afectar el negocio CFR?</th>
                            <th>Estas decisiones estan relacionadas con el/los hospitales a nivel Local, Regional or Nacional?</th>
                            <th>El HCP tiene en espera tomar alguna decisión relacionada con los intereses de  Abbott?</th>
                            <th>Ha tomado el HCP alguna decisión o influenciado en cualquier decisión relacionada con Abbott en los últimos seis meses, o lo hará en los próximos 6 meses?</th>
                        </tr>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}