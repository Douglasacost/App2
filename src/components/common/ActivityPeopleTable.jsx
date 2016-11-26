import React, { Component } from 'react';
import TextInput from '../common/TextInput';
import { Textfield } from 'react-mdl';
import CheckboxInput from '../common/CheckboxInput';
import { setField } from '../../actions/Actions';
import { connect } from 'react-redux';
import { Map, fromJS, List } from 'immutable';

class ActivityPeopleTable extends Component {
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
        let numero = this.props.list.size + 1;
        data.numero = numero.toString();
        console.log(data);
        array.push(data);
        let listData = List(array);
        this.props.setField(this.props.form, this.props.input, listData);
    }
    render() {
        let { className, label, list, form, input } = this.props;
        return (
            <div className={className}>
                <span className='Form-label'>{label}</span>
                <form id='addItem'>
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
                            {list.map(function(listItem, i){
                                    return (
                                        <tr key={i}>
                                            <td>{listItem.numero}</td>
                                            <td>{listItem.nombre}</td>
                                            <td>{listItem.empleado}</td>
                                            <td>{listItem.profesionalDeSalud}</td>
                                            <td>{listItem.empleadoDelGobierno}</td>
                                            <td>{listItem.institucion}</td>
                                            <td>{listItem.puesto}</td>
                                        </tr>
                                    );
                                })}
                            <tr><td colSpan="4" scope="colgroup">Agregar nuevo registro</td></tr>
                            <tr>
                                <td><input type="text" placeholder="" name='nombre' /></td>
                                <td><input type="text" placeholder="" name='empleado' /></td>
                                <td><input type="text" placeholder="" name='profesionalDeSalud' /></td>
                                <td><input type="text" placeholder="" name='empleadoDelGobierno' /></td>
                                <td><input type="text" placeholder="" name='institucion' /></td>
                                <td><input type="text" placeholder="" name='puesto' /></td>
                            </tr>
                        </tbody>
                    </table>
                    { (this.props.list.size < 4 ) &&
                        <button className="mui-btn mui-btn--primary" onClick={this.handleAdd.bind(this)}>Agregar</button>
                    }
                    
                </form>
            </div>
        );
    }
}

export default connect(null, { setField })(ActivityPeopleTable);