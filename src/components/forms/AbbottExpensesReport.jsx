import React, { Component } from 'react';
import TextInput from '../common/TextInput';
import TextBoxInput from '../common/TextBoxInput';
import DateInput from '../common/DateInput';
import Firm from '../common/Firm';
import Notes from '../common/Notes';
import TextInputGroup from '../common/TextInputGroup';
import ExpensesTable from '../common/ExpensesTable';
import Dropdown from '../common/Dropdown';
import ApproverFirm from '../common/ApproverFirm';
import Liquidation from '../common/Liquidation';
import { Map, fromJS, List } from 'immutable';
import moment from 'moment';

var formApi = require('../../modules/FormApi');
var formApiInstance = new formApi();

const sharepointUrl = _spPageContextInfo.webAbsoluteUrl;
const notes = [
        {
            text: 'Damos fe que todos los documentos que soportan este reporte de gastos fueron ejecutados en el ejercicio de las funciones asignadas.'
        }];
const expenseType = List([
  {Title: 'Reintegro'}, {Title: 'Anticipo'}, {Title: 'Liquidación Anticipo'}
]);
const form = 'abbottExpensesReport';
export default class AbbottExpensesReport extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        console.log('entered didmount');
        var formId = this.props.params.id;
        if (formId){
            this.getDataFromList(formId);
            this.getTableData(formId);
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
    getDataFromList(formId) {
        console.log('entered get');
        let keysNames = ['fecha','solicitante','puesto','pais','descripcion', 'tipoDeGasto', 'anticipo', 'gastos', 'depositos', 'total',
                        'totalEnLetras', 'titular', 'fechaFirmaTitular', 'autorizacion',
                        'fechaFirmaAutorizacion', 'autorizacionAprobo', 'nombreTransferencia',
                        'cuentaBancaria', 'estado'];
        let data = formApiInstance.getData(sharepointUrl,
            'ExpensesReport', 
            keysNames, 
            formId, 
            form, 
            this.props.setFormData.bind(this)
            );
    }
    getTableData(formId){
        console.log('entered tabledata');
        // disable inputs when getting data because they are no longer editable
        document.getElementsByClassName('fieldset-to-disable').disabled = true;
        let keysNames = ['fecha','factura','pais','descripcion', 'tc', 'otraMoneda', 'total'];
        let data = formApiInstance.getTableData(
            'ExpensesTable', 
            keysNames, 
            formId, 
            form,
            'list',
            this.props.setField.bind(this)
            );
    }
    handleSubmit(e){
        console.log('entered handle submit');
        e.preventDefault();
        var formApiInstance = new formApi();
        let formState;
        const formId = this.props.params.id;
        if (formId && formId !== undefined && formId !== null && formId !== '' ){
            formState = this.props.formState;    
        } else {
            formState = this.props.formState.set('titular', this.props.user.get('displayName')).set('fechaFirmaTitular', moment().toISOString()).set('estado', 'Pendiente').set('fecha', moment().toISOString());
        }
        formState = formState.delete('list').delete('tempDate');
        formApiInstance.postData(sharepointUrl,
            'ExpensesReport',
            'ExpensesReport',
            formState,
            this.props.params.id,
            this.handleSubmitTable.bind(this)
        );
    }
    handleSubmitTable(id){
        console.log('entered submit table');
        let tableAsJson = this.props.formState.get('list').toJS();
        console.log(tableAsJson);
        formApiInstance.postBatchRequest( 'ExpensesTable', tableAsJson, id);
    }
    render() {
        let { formState, user } = this.props;
        let fecha = formState.get('fecha');
        let today = moment();
        return (
            <div className='Form MainScreen mui-container-fluid'>
                <form className='Form-container AbbottExpensesReport' action="#">
                    <div className='mui-row'>
                        <div className='mui-col-md-6 mui-paddingFix'>
                            <span className='Form-text Form-title'>ABBOTT CACMP-DR</span>
                            <span className='Form-text Form-state'>Estado: {formState.get('estado')}</span>
                            <span className='Form-text Form-state'>Id: {this.props.params.id}</span>
                        </div>
                        <div className='mui-col-md-6 mui-paddingFix'>
                            <Liquidation state={formState} form={form} className='Form-liquidation' />
                        </div>
                    </div>
                    <div className='mui-row'>
                        <fieldset className='Form-fieldSet' id='fieldset-to-disable'>
                            <div className='mui-row'>
                                <div className='mui-col-md-8 mui-paddingFix'>
                                    <DateInput className='' label='Fecha de Solicitud:' stringDate={(fecha !== undefined && fecha !== null && fecha !== '') ? moment(fecha) : today } form={form} input='fecha' disabled={true}/>
                                    <TextInput label='Nombre del Solicitante:' value={formState.get('solicitante')} id='solicitante' form={form} className='Form-textInputBox Form-seventy'/>
                                    <TextInput label='Puesto:' value={formState.get('puesto')} id='puesto' form={form} className='Form-textInputBox Form-seventy'/>
                                    <TextInput label='Pais - Presupuesto:' value={formState.get('pais')} id='pais' form={form} className='Form-textInputBox Form-seventy'/>
                                </div>
                                <div className='mui-col-md-4 mui-paddingFix'>
                                    <Dropdown options={expenseType} label='Tipo de Gasto' selected={formState.get('tipoDeGasto')} input='tipoDeGasto' form={form} />
                                </div>   
                            </div>
                            <div className='mui-row'> 
                                <span className='Divider-blue'></span>
                                <span className='Form-label Form-label--leftAlign'>Descripcion del gasto (Motivo del gasto):</span>
                                <TextBoxInput rows='3' id='descripcion' value={formState.get('descripcion')} form={form}/>
                                <ExpensesTable list={formState.get('list')} form={form} input='list' className='Table' selectedDate={formState.get('tempDate')}/>
                                <span className='Form-label Form-label--leftAlign'>TOTAL EN LETRAS:</span>
                                <TextInput label='' value={formState.get('totalEnLetras')} id='totalEnLetras' form={form} className='Form-textInputBox'/>
                            </div>
                        </fieldset>
                        <fieldset className='Form-fieldSet'>
                            <div className='mui-row'>
                                <Firm label='Firma de Titular:' user={user.get('displayName')} solicitante={formState.get('titular')} stringDate={formState.get('fechaFirmaTitular')} form={form} input='fechaFirmaTitular' />                
                                { (this.props.params.id) ?
                                    <ApproverFirm label='Firma de Autoricacion (Jefatura Inmediata)' aprobador={formState.get('autorizacion')} aprobado={formState.get('autorizacionAprobo')} stringDate={formState.get('fechaFirmaAutorizacion')} form={form} dateInput='fechaFirmaAutorizacion' approveInput='autorizacionAprobo' user={user.get('displayName')} state={formState}/>
                                    :
                                    <Dropdown options={formState.get('aprobadores')} label='Seleccione Jefatura Inmediata' selected={formState.get('autorizacion')} input='autorizacion' form={form} />
                                }
                                <Notes notes={notes} className='Note-container--blueBG' />
                                <TextInput label='HACER TRANSFERENCIA A NOMBRE:' value={formState.get('nombreTransferencia')} id='nombreTransferencia' form={form} className='Form-textInputBox'/>                
                                <TextInput label='CUENTA BANCARIA:' value={formState.get('cuentaBancaria')} id='cuentaBancaria' form={form} className='Form-textInputBox'/>
                            </div>
                        </fieldset>
                    </div>
                </form>
                { (formState.get('estado') !== 'Aprobado' && formState.get('estado') !== 'Rechazado' ) ?
                    <button className="mui-btn mui-btn--primary" onClick={this.handleSubmit.bind(this)}>Enviar</button>
                    :
                    <button className="mui-btn mui-btn--primary" onClick={this.handlePrint.bind(this)}>Imprimir</button>
                }
            </div>
        );
    }
}