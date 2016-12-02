import React, { Component } from 'react';
import TextInput from '../common/TextInput';
import { Textfield } from 'react-mdl';
import { Checkbox } from 'react-mdl';
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
        let addItemForm = document.getElementById('addItem');
        let formElements = addItemForm.elements;
        console.log(formElements);
        let data = {};
        let array = this.props.list.toArray();
        for (var i=0; i<formElements.length; i++) {
            let name = formElements[i].name,
                value = formElements[i].value,
                type = formElements[i].type;
            if (value !== ''){
                console.log(name);
                console.log(value);
                data[name] = value;
            }
            if (type === 'checkbox'){
                console.log(name);
                console.log(type);
                console.log(formElements[i].checked);
                data[name] = (formElements[i].checked === true) ? 'si' : 'no';
            }
        }
        console.log(data);
        array.push(data);
        let listData = List(array);
        addItemForm.reset();
        this.props.setField(this.props.form, this.props.input, listData);
    }
    handleDelete(i){
        let newList = this.props.list.delete(i);
        this.props.setField(this.props.form, this.props.input, newList);
    }
    render() {
        let { className, label, list, form, input, state } = this.props;
        let handleDelete = this.handleDelete.bind(this);
        let estadoActual = state.get('estado');
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
                            <th colSpan="2" scope="colgroup"></th>
                            <th colSpan="3" scope="colgroup">Marque si</th>
                            <th colSpan="2" scope="colgroup"></th>
                        </tr>
                        <tr>
                            <th>No.</th>
                            <th>Nombre del Participante</th>
                            <th>Es Empleado</th>
                            <th>Es Profesional de Salud</th>
                            <th>Es empleado del Gobierno</th>
                            <th>Nombre del Hospital o Institucion</th>
                            <th>Nombre del puesto en el Hospital o Institucion</th>
                            { (estadoActual !== 'Pendiente' && estadoActual !== 'Aprobado' && estadoActual !== 'Rechazado') &&
                                <th></th>
                            }
                        </tr>
                        {list.map(function(listItem, i){
                                let empleadoChecked = (listItem.empleado === 'si') ? true : false;
                                let saludChecked = (listItem.profesionalDeSalud === 'si') ? true : false;
                                let gobiernoChecked = (listItem.empleadoDelGobierno === 'si') ? true : false;
                                let numero = i + 1;
                                return (
                                    <tr key={i}>
                                        <td>{numero}</td>
                                        <td>{listItem.nombre}</td>
                                        <td><Checkbox label='' ripple onChange={()=>{}} checked={empleadoChecked} disabled={true}/></td>
                                        <td><Checkbox label='' ripple onChange={()=>{}} checked={saludChecked} disabled={true}/></td>
                                        <td><Checkbox label='' ripple onChange={()=>{}} checked={gobiernoChecked} disabled={true}/></td>
                                        <td>{listItem.institucion}</td>
                                        <td>{listItem.puesto}</td>
                                        { (estadoActual !== 'Pendiente' && estadoActual !== 'Aprobado' && estadoActual !== 'Rechazado') &&
                                            <td onClick={handleDelete.bind(this, i)}>borrar</td>
                                        }
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
                <span className='Form-spacer'></span>
                { (this.props.list.size < 4 && estadoActual !== 'Pendiente' && estadoActual !== 'Aprobado' && estadoActual !== 'Rechazado' ) &&
                    <form id='addItem'>
                        <legend>Agregar nuevo registro</legend>
                        <div className="mui-textfield mui-textfield--float-label">
                            <input type="text" name='nombre' />
                            <label>Nombre del Participante</label>
                        </div>
                        <div className="mui-checkbox">
                            <label>
                                <input type="checkbox" value="" name='empleado'/>
                                Maque si es Empleado
                            </label>
                        </div>
                        <div className="mui-checkbox">
                            <label>
                                <input type="checkbox" value="" name='profesionalDeSalud'/>
                                Maque si es Profesional de Salud
                            </label>
                        </div>
                        <div className="mui-checkbox">
                            <label>
                                <input type="checkbox" value="" name='empleadoDelGobierno'/>
                                Indique si es empleado del Gobierno
                            </label>
                        </div>
                        <div className="mui-textfield mui-textfield--float-label">
                            <input type="text" name='institucion' />
                            <label>Nombre del Hospital o Institucion</label>
                        </div>
                        <div className="mui-textfield mui-textfield--float-label">
                            <input type="text" name='puesto' />
                            <label>Nombre del puesto en el Hospital o Institucion</label>
                        </div>
                        <button type="submit" className="mui-btn mui-btn--raised mui-btn--primary" onClick={this.handleAdd.bind(this)}>Agregar</button>
                    </form>
                }
            </div>
        );
    }
}

export default connect(null, { setField })(ActivityPeopleTable);