import React, { Component } from 'react';
import TextInput from '../common/TextInput';
import CheckboxInput from '../common/CheckboxInput';
import DateInput from '../common/DateInput';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { setField } from '../../actions/Actions';
import { connect } from 'react-redux';
import { Map, fromJS, List } from 'immutable';

class ExpensesTable extends Component {
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
                value = formElements[i].value;
            console.log(name);
            console.log(value);
            if (value !== '' && name !== ''){
                data[name] = value;
            }
        }
        array.push(data);
        let listData = List(array);
        addItemForm.reset();
        this.props.setField(this.props.form, this.props.input, listData);
    }
    setLocalDate(date){
        this.props.setField(this.props.form, 'tempDate', date);
    }
    handleDelete(i){
        let newList = this.props.list.delete(i);
        this.props.setField(this.props.form, this.props.input, newList);
    }
    render() {
        let { className, label, list, form, input, selectedDate, state } = this.props;
        let setLocalDate = this.setLocalDate.bind(this);
        let estadoActual = state.get('estado');
        let today = moment();
        let totalMoneda = 0;
        let total = 0;
        let handleDelete = this.handleDelete.bind(this);
        let descripcionWidth = '200px';
        list.map(function(listItem, i){
            let otraMonedaNumber = parseFloat(listItem.otraMoneda);
            let otraMonedaProcessed = (isNaN(otraMonedaNumber)) ? 0 : otraMonedaNumber;
            let totalNumber = parseFloat(listItem.total);
            let totalProcessed = (isNaN(totalNumber)) ? 0 : totalNumber;
            totalMoneda += otraMonedaProcessed;
            total += totalProcessed;
        });
        return (
            <div className={className}>
                <span className='Form-label'>{label}</span>
                <form id='addItem'>
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
                                { (estadoActual !== 'Pendiente' && estadoActual !== 'Aprobado' && estadoActual !== 'Rechazado') &&
                                    <th></th>
                                }
                            </tr>
                            {list.map(function(listItem, i){
                                        return (
                                            <tr key={i}>
                                                <td><DatePicker
                                                        todayButton={"Hoy"}
                                                        selected={moment(listItem.fecha)}
                                                        onChange={()=>{}} disabled={true}/></td>
                                                <td>{listItem.factura}</td>
                                                <td>{listItem.pais}</td>
                                                <td>{listItem.descripcion}</td>
                                                <td>{listItem.tc}</td>
                                                <td>{listItem.otraMoneda}</td>
                                                <td>{listItem.total}</td>
                                                { (estadoActual !== 'Pendiente' && estadoActual !== 'Aprobado' && estadoActual !== 'Rechazado') &&
                                                    <td onClick={handleDelete.bind(this, i)}>borrar</td>
                                                }
                                            </tr>
                                        );
                                    })}
                            <tr>
                                <td colSpan='5'>TOTALES</td>
                                <td>{totalMoneda}</td>
                                <td>{total}</td>
                            </tr>
                            { (this.props.list.size < 12 && estadoActual !== 'Pendiente' && estadoActual !== 'Aprobado' && estadoActual !== 'Rechazado' ) &&
                                <tr><td colSpan="7" scope="colgroup">Agregar nuevo registro</td></tr>
                            }
                            { (this.props.list.size < 12 && estadoActual !== 'Pendiente' && estadoActual !== 'Aprobado' && estadoActual !== 'Rechazado' ) &&
                                <tr>
                                    <td><DatePicker
                                            todayButton={"Hoy"}
                                            selected={(selectedDate !== undefined && selectedDate !== null && selectedDate !== '') ? moment(selectedDate) : today}
                                            onChange={setLocalDate.bind(this)}
                                            name='fecha' /></td>
                                    <td><input type="text" placeholder="" name='factura' maxLength="7"/></td>
                                    <td><input type="text" placeholder="" name='pais' maxLength="4" /></td>
                                    <td><input type="text" placeholder="" name='descripcion' /></td>
                                    <td><input type="text" placeholder="" name='tc' /></td>
                                    <td><input type="text" placeholder="" name='otraMoneda' /></td>
                                    <td><input type="text" placeholder="" name='total' /></td>
                                </tr>
                            }
                        </tbody>
                    </table>
                    { (this.props.list.size < 12 && estadoActual !== 'Pendiente' && estadoActual !== 'Aprobado' && estadoActual !== 'Rechazado' ) &&
                        <button className="mui-btn mui-btn--primary" onClick={this.handleAdd.bind(this)}>Agregar</button>
                    }
                </form>
            </div>
        );
    }
}

export default connect(null, { setField })(ExpensesTable);