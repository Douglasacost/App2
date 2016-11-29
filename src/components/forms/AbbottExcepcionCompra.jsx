import React, { Component } from 'react';
import { Map, fromJS, List } from 'immutable';
import TextInput from '../common/TextInput';
import DateInput from '../common/DateInput';
import RadioInput from '../common/RadioInput';
import Firm from '../common/Firm';
import ApproverFirm from '../common/ApproverFirm';
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

const sharepointUrl = _spPageContextInfo.webAbsoluteUrl;
let todayDate = moment();
const requiereFirma = ['Si', 'No'];
const orderType = [ 'Orden de compra emitida después del evento', 'Proveedor único (no cotizaciones adicionales)'];

const form = 'abbottExcepcionCompra';

export default class AbbottExcepcionCompra extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        console.log('entered didmount');
        var formId = this.props.params.id;
        if (formId){
            this.getDataFromList(formId);
        } else {
            console.log('entered aprovers');
            formApiInstance.getDataList(sharepointUrl,
                'Approvers',
                form,
                'aprobadores',
                this.props.setField.bind(this)
            );
        }
    }
    componentDidUpdate(){
        console.log('component did update');
        if(this.props.formState.get('aprobadores').size > 0 && this.props.formState.get('gerenteGeneral') === ''){ this.setGerenteGenetal(); }
    }
    getDataFromList(formId) {
        console.log('entered get');
        const realURL = 'https://xourse.sharpoint.com/sites/forms/_vti_bin/listdata.svc/Excepci%C3%B3nDeCompra(1)?$select=Fecha,TipoDeOrden,OrdenDeCompra,Proveedores,BienesOServiciosSolicitados,Monto,Moneda,RazonDeExcepcion,FechaFirmaDelSolicitante';
        let keysNames = ['fecha','tipoDeOrden','ordenDeCompra','proveedor','bienesOServiciosSolicitados','monto','moneda','razonDeExcepcion','fechaFirmaDelSolicitante','fechaFirmaDelSolicitante','fechaFirmaDelJefeInmediato','fechaFirmaDelGerente', 'jefeInmediato', 'gerenteGeneral', 'requiereFirmaDirector', 'jefeInmediatoAprobo', 'gerenteGeneralAprobo', 'solicitante', 'estado'];
        let data = formApiInstance.getData(sharepointUrl,
            'ExcepcionDeCompra', 
            keysNames, 
            formId, 
            form, 
            this.props.setFormData.bind(this)
            );
    }
    handleSubmit(e){
        console.log('entered handle submit');
        e.preventDefault();
        let solicitante = this.props.formState.get('solicitante');
        let formState;
        const formId = this.props.params.id;
        if (formId && formId !== undefined && formId !== null && formId !== '' ){
            formState = this.props.formState;    
        } else {
            formState = this.props.formState.set('solicitante', this.props.user.get('displayName')).set('fechaFirmaDelSolicitante', moment().toISOString()).set('estado', 'Pendiente').set('fecha', moment().toISOString());
        }
        let teststate = this.props.formState.toJS();
        formApiInstance.postData(sharepointUrl,
            'ExcepcionDeCompra',
            'Abbott01',
            formState,
            this.props.params.id
        );
    }
    setGerenteGenetal(){
        console.log('set Gerente General');
        let aprobadores = this.props.formState.get('aprobadores').toArray();
        let gerenteGeneral;
        console.log(aprobadores);
        aprobadores.map(function(obj){
            console.log(obj);
            if(obj.Cargo === 'GerenteGeneral'){gerenteGeneral = obj.Title}
        });
        this.props.setField(form, 'gerenteGeneral', gerenteGeneral);
    }
    render() {
        let { formState, user } = this.props;
        let fecha = formState.get('fecha');
        let today = moment();
        return (
            <div className='Form MainScreen'>
                <form className='Form-container AbbottExcepcionCompra' name='AbbottExcepcionCompra'
                    onSubmit={this.handleSubmit.bind(this)}>
                    <div className='Form-titleContainer'>
                        <span className='Form-text Form-title'>CFR CACM-P-RD</span>
                        <span className='Form-text Form-state'>Estado: {formState.get('estado')}</span>
                        <span className='Form-text Form-state'>Id: {this.props.params.id}</span>
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
                            selected={formState.get('tipoDeOrden')}
                            options={orderType}/>
                        <DateInput className='' label='Fecha:' stringDate={(fecha !== undefined && fecha !== null && fecha !== '') ? moment(fecha) : today } form={form} input='fecha' disabled={true}/>
                        <NumberInput label='Orden de Compra:' id='ordenDeCompra'value={formState.get('ordenDeCompra')} className='Form-textInputBox' form={form}/>
                        <TextInput label='Nombre del Proveedor' value={formState.get('proveedor')} id='proveedor' className='Form-textInputBox' form={form}/>
                        <TextInput label='Bienes o Servicios solicitados:' id='bienesOServiciosSolicitados' value={formState.get('bienesOServiciosSolicitados')} className='Form-textInputBox' form={form}/>
                        <NumberInput label='Monto:' id='monto' value={formState.get('monto')} className='Form-textInputBox' form={form}/>
                        <TextInput label='Moneda:' id='moneda' value={formState.get('moneda')} className='Form-textInputBox' form={form}/>
                        <span className='Form-label'>Razón de la excepción:</span>
                        <TextBoxInput rows='4' id='razonDeExcepcion' value={formState.get('razonDeExcepcion')} form={form}/>
                        <Firm label='Firma del Budgetary solicitante:' user={user.get('displayName')} solicitante={formState.get('solicitante')} stringDate={formState.get('fechaFirmaDelSolicitante')} form={form} input='fechaFirmaDelSolicitante' />
                        { (this.props.params.id) ?
                            <ApproverFirm label='Firma del jefe inmediato:' aprobador={formState.get('jefeInmediato')} aprobado={formState.get('jefeInmediatoAprobo')} stringDate={formState.get('fechaFirmaDelJefeInmediato')} form={form} dateInput='fechaFirmaDelJefeInmediato' approveInput='jefeInmediatoAprobo' user={user.get('displayName')} state={formState} />
                            :
                            <Dropdown options={formState.get('aprobadores')} label='Seleccione jefe inmediato' selected={formState.get('jefeInmediato')} input='jefeInmediato' form={form} />
                        }
                        <ApproverFirm label='Firma del Director o Gerente General del área:' aprobador={formState.get('gerenteGeneral')} aprobado={formState.get('gerenteGeneralAprobo')} stringDate={formState.get('fechaFirmaDelGerente')} form={form} dateInput='fechaFirmaDelGerente' approveInput='gerenteGeneralAprobo' id='approvebtn' user={user.get('displayName')} flagGerente={(formState.get('gerenteGeneral') === user.get('displayName') && formState.get('estado') === 'Pendiente' && formState.get('tipoDeOrden') === 'Orden de compra emitida después del evento') ? true : false} state={formState}/>
                        { (formState.get('estado') !== 'Aprobado' && formState.get('estado') !== 'Rechazado' ) && 
                            <button className="mui-btn mui-btn--primary" onClick={this.handleSubmit.bind(this)}>Enviar</button>
                        }
                        
                    </div>
                </form>
            </div>
        );
    }
}