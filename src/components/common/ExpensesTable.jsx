import React, { Component } from 'react';
import TextInput from '../common/TextInput';
import CheckboxInput from '../common/CheckboxInput';
import DateInput from '../common/DateInput';
import DatePicker from 'react-datepicker';
import { setField } from '../../actions/Actions';
import { connect } from 'react-redux';
import { Map, fromJS, List } from 'immutable';

class ExpensesTable extends Component {
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
                            {list.map(function(listItem, i){
                                        return (
                                            <tr key={i}>
                                                <td><DatePicker
                                                        todayButton={"Hoy"}
                                                        selected={listItem.fecha}
                                                        onChange={()=>{}} disabled={true}/></td>
                                                <td>{listItem.factura}</td>
                                                <td>{listItem.pais}</td>
                                                <td>{listItem.descripcion}</td>
                                                <td>{listItem.tc}</td>
                                                <td>{listItem.otraMoneda}</td>
                                                <td>{listItem.total}</td>
                                            </tr>
                                        );
                                    })}
                            <tr>
                                <td colSpan='5'>TOTALES</td>
                                <td>test</td>
                                <td>test</td>
                            </tr>
                            { (this.props.list.size < 12 ) &&
                                <tr><td colSpan="7" scope="colgroup">Agregar nuevo registro</td></tr>
                            }
                            { (this.props.list.size < 12 ) &&
                                <tr>
                                    <td><DatePicker
                                            todayButton={"Hoy"}
                                            selected=''
                                            onChange={()=>{}}
                                            name='fecha'
                                            form='addItem' /></td>
                                    <td><input type="text" placeholder="" name='factura' maxlength="7"/></td>
                                    <td><input type="text" placeholder="" name='pais' maxlength="4" /></td>
                                    <td><input type="text" placeholder="" name='descripcion' /></td>
                                    <td><input type="text" placeholder="" name='tc' /></td>
                                    <td><input type="text" placeholder="" name='otraMoneda' /></td>
                                    <td><input type="text" placeholder="" name='total' /></td>
                                </tr>
                            }
                        </tbody>
                    </table>
                    { (this.props.list.size < 12 ) &&
                        <button className="mui-btn mui-btn--primary" onClick={this.handleAdd.bind(this)}>Agregar</button>
                    }
                </form>
            </div>
        );
    }
}

export default connect(null, { setField })(ExpensesTable);