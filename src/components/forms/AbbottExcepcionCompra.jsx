import React, { Component } from 'react';
import { Map, fromJS, List } from 'immutable';
import TextInput from '../common/TextInput';
import DateInput from '../common/DateInput';
import RadioInput from '../common/RadioInput';
import Firm from '../common/Firm';
import Notes from '../common/Notes';
import CheckboxInput from '../common/CheckboxInput';
import NumberInput from '../common/NumberInput';
import NumericTable from '../common/NumericTable';
import TextBoxInput from '../common/TextBoxInput';
import Dropdown from '../common/Dropdown';
import moment from 'moment';
import $ from "jquery";

var formApi = require('../../modules/FormApi');
var formApiInstance = new formApi();

let todayDate = moment();
const requiereFirma = ['si', 'no'];
const orderType = [ 'Orden de compra emitida después del evento', 'Proveedor único (no cotizaciones adicionales)'];

const form = 'abbottExcepcionCompra';

export default class AbbottExcepcionCompra extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        var formId = this.props.params.id;
        if (formId){
            this.getDataFromList(formId);
        } else {
            formApiInstance.getDataList('/sites/forms/',
                'Approvers',
                form,
                'aprobadores',
                this.props.setField.bind(this)
            );
        }
    }
    getDataFromList(formId) {
        console.log('entered get');
        const realURL = 'https://xourse.sharpoint.com/sites/forms/_vti_bin/listdata.svc/Excepci%C3%B3nDeCompra(1)?$select=Fecha,TipoDeOrden,OrdenDeCompra,Proveedores,BienesOServiciosSolicitados,Monto,Moneda,RazonDeExcepcion,FechaFirmaDelSolicitante';
        let keysNames = ['Fecha','TipoDeOrden','OrdenDeCompra','Proveedor','BienesOServiciosSolicitados','Monto','Moneda','RazonDeExcepcion','FechaFirmaDelSolicitante','FechaFirmaDelSolicitante','FechaFirmaDelJefeInmediato','FechaFirmaDelGerente', 'JefeInmediato', 'GerenteGeneral', 'RequiereFirmaDirector'];
        let data = formApiInstance.getData('/sites/forms/',
            'ExcepcionDeCompra', 
            keysNames, 
            formId, 
            form, 
            this.props.setFormData.bind(this)
            );
    }
    handleSubmit(e){
        e.preventDefault();
        var formApiInstance = new formApi();
        formApiInstance.postData('/sites/forms',
            'ExcepcionDeCompra',
            'Abbott01',
            this.props.abbottExcepcionCompra
        );
    }
    render() {
        let { abbottExcepcionCompra, user } = this.props;
        return (
            <div className='Form MainScreen'>
                <form className='Form-container AbbottExcepcionCompra' name='AbbottExcepcionCompra'
                    onSubmit={this.handleSubmit.bind(this)}>
                    <div className='Form-titleContainer'>
                        <span className='Form-text Form-title'>CFR CACM-P-RD</span>
                        <span className='Form-text Form-description'>Solicitud de excepción en compra</span>
                    </div>
                    <div className='Form-fieldSet'>
                        <span className='Form-label'>Nota: Adjuntar este documento a la orden de compra para la aprobación de finanzas.</span>
                        <span className='Form-label'>Por este medio solicito autorización para la siguiente excepción en compras:</span>
                        <RadioInput 
                            label='Marcar una de las dos op.:' 
                            name='tipoDeOrden'
                            id='tipoDeOrden'
                            form={form}
                            selected={abbottExcepcionCompra.get('tipoDeOrden')}
                            options={orderType}/>
                        <DateInput className='' label='Fecha:' stringDate={abbottExcepcionCompra.get('fecha')} form={form} input='fecha' />
                        <NumberInput label='Orden de Compra:' id='ordenDeCompra'value={abbottExcepcionCompra.get('ordenDeCompra')} className='Form-textInputBox' form={form}/>
                        <TextInput label='Nombre del Proveedor' value={abbottExcepcionCompra.get('proveedor')} id='proveedor' className='Form-textInputBox' form={form}/>
                        <TextInput label='Bienes o Servicios solicitados:' id='bienesOServiciosSolicitados' value={abbottExcepcionCompra.get('bienesOServiciosSolicitados')} className='Form-textInputBox' form={form}/>
                        <NumberInput label='Monto:' id='monto' value={abbottExcepcionCompra.get('monto')} className='Form-textInputBox' form={form}/>
                        <TextInput label='Moneda:' id='moneda' value={abbottExcepcionCompra.get('moneda')} className='Form-textInputBox' form={form}/>
                        <span className='Form-label'>Razón de la excepción:</span>
                        <TextBoxInput rows='4' id='razonDeExcepcion' value={abbottExcepcionCompra.get('razonDeExcepcion')} form={form}/>
                        <Firm label='Firma del Budgetary solicitante:' user={user.get('displayName')} stringDate={abbottExcepcionCompra.get('fechaFirmaDelSolicitante')} form={form} input='fechaFirmaDelSolicitante' />
                        { (this.props.params.id) ?
                            <Firm label='Firma del jefe inmediato:' aprobador={abbottExcepcionCompra.get('jefeInmediato')} aprobado={abbottExcepcionCompra.get('jefeInmediatoAprobo')} stringDate={abbottExcepcionCompra.get('fechaFirmaDelJefeInmediato')} form={form} input='fechaFirmaDelJefeInmediato' />
                            :
                            <Dropdown options={abbottExcepcionCompra.get('aprobadores')} selected={abbottExcepcionCompra.get('jefeInmediato')} input='jefeInmediato' form={form} />
                        }
                        { (this.props.params.id && abbottExcepcionCompra.get('requiereFirmaDirector') !== 'no') ?
                            <Firm label='Firma del Director o Gerente General del área:' aprobador={abbottExcepcionCompra.get('gerenteGeneral')} aprobado={abbottExcepcionCompra.get('gerenteGeneralAprobo')} stringDate={abbottExcepcionCompra.get('fechaFirmaDelGerente')} form={form} input='fechaFirmaDelGerente' />
                            :
                            ( (!this.props.params.id) &&
                                <RadioInput 
                                    label='¿Requiere firma del gerente? (Requerida para Ordenes de Compra emitidas después del evento)' 
                                    name='requiereFirmaDirector'
                                    id='requiereFirmaDirector'
                                    form={form}
                                    selected={abbottExcepcionCompra.get('requiereFirmaDirector')}
                                    options={requiereFirma}/>

                             )
                                
                        }
                        <input type="submit" value="Enviar"></input >
                    </div>
                </form>
            </div>
        );
    }
}