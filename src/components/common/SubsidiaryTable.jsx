import React, { Component } from 'react';
import TextInput from '../common/TextInput';
import CheckboxInput from '../common/CheckboxInput';
import { Textfield } from 'react-mdl';
import { setField } from '../../actions/Actions';
import { connect } from 'react-redux';
import { Map, fromJS, List } from 'immutable';

class SubsidiaryTable extends Component {
    constructor(props) {
        super(props);
    }
    handleAdd(e){
        e.preventDefault();
        let formElements = document.getElementById('addItem').elements;
        console.log(formElements);
        let data = {};
        let array = this.props.list.toArray();
        for (var i=0; i<formElements.length; i++) {
            let name = formElements[i].name,
                value = formElements[i].value;
            console.log(name);
            console.log(value);
            if (value !== ''){
                data[name] = value;
            }
        }
        console.log(data);
        array.push(data);
        let listData = List(array);
        this.props.setField(this.props.form, this.props.input, listData);
    }
    render() {
        let { className, label, list, form, input } = this.props;
        console.log(list);
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
                <form id='addItem'>
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
                            {list.map(function(listItem, i){
                                return (
                                    <tr key={i}>
                                        <td>{listItem.nombre}</td>
                                        <td>{listItem.cargo}</td>
                                        <td>{listItem.gobierno}</td>
                                        <td>{listItem.rol}</td>
                                        <td>{listItem.impacto}</td>
                                        <td>{listItem.escala}</td>
                                        <td>{listItem.interes}</td>
                                        <td>{listItem.abbott}</td>
                                    </tr>
                                );
                            })}
                            <tr><td>Agregar nuevo registro</td></tr>
                            <tr>
                                <td><input type="text" placeholder="" name='nombre' /></td>
                                <td><input type="text" placeholder="" name='cargo' /></td>
                                <td><input type="text" placeholder="" name='gobierno' /></td>
                                <td><input type="text" placeholder="" name='rol' /></td>
                                <td><input type="text" placeholder="" name='impacto' /></td>
                                <td><input type="text" placeholder="" name='escala' /></td>
                                <td><input type="text" placeholder="" name='interes' /></td>
                                <td><input type="text" placeholder="" name='abbott' /></td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="mui-btn mui-btn--primary" onClick={this.handleAdd.bind(this)}>Agregar</button>
                </form>
            </div>
        );
    }
}

export default connect(null, { setField })(SubsidiaryTable);