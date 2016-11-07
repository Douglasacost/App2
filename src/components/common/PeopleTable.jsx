import React, { Component } from 'react';
import TextInput from '../common/TextInput';
import CheckboxInput from '../common/CheckboxInput';

export default class PeopleTable extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let { className, label } = this.props;
        var rows = [];
        for (var i=0; i < 4; i++) {
            var index = i + 1 ;
            rows.push(
                <tr key={index}>
                    <td>{index}</td>
                    <td><TextInput label='' className='Table-textInputBox'/></td>
                    <td><CheckboxInput 
                        className='Checkbox-container--tableOption'
                        label='' /></td>
                    <td><CheckboxInput 
                        className='Checkbox-container--tableOption'
                        label='' /></td>
                    <td><TextInput label='' className='Table-textInputBox'/></td>
                    <td><TextInput label='' className='Table-textInputBox'/></td>
                    <td><TextInput label='' className='Table-textInputBox'/></td>
                </tr>
            );
        }
        return (
            <div className={className}>
                <span className='Form-label'>{label}</span>
                <table>
                    <tbody>
                        <tr>
                            <th colSpan="4" scope="colgroup">Participantes</th>
                            <th colSpan="3" scope="colgroup">Complete esta parte si el participante es empleado del gobierno</th>
                        </tr>
                        <tr>
                            <th>No.</th>
                            <th>Nombre del Participante</th>
                            <th>Maque si es Empleado</th>
                            <th>Marque si es Profesional de Salud</th>
                            <th>Indique si es empleado del Gobierno</th>
                            <th>Nombre del Hospital o Institucion</th>
                            <th>Nombre del puesto en el Hospital o Institucion</th>
                        </tr>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}