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
        var formId = this.props.params.id;
        if (formId){
            this.getDataFromList(formId);
            this.getTableData(formId);
        } else {
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
        e.preventDefault();
        var formApiInstance = new formApi();
        let formState;
        const formId = this.props.params.id;
        if (formId && formId !== undefined && formId !== null && formId !== '' ){
            formState = this.props.abbottExpensesReport;    
        } else {
            formState = this.props.abbottExpensesReport.set('titular', this.props.user.get('displayName')).set('fechaFirmaTitular', moment().toISOString()).set('estado', 'Pendiente');
        }
        formState = formState.delete('list');
        formApiInstance.postData(sharepointUrl,
            'ExpensesReport',
            'ExpensesReport',
            formState,
            this.props.params.id,
            this.handleSubmitTable.bind(this)
        );
    }
    handleSubmitTable(id){
        let tableAsJson = this.props.abbottExpensesReport.get('list').toJS();
        console.log(tableAsJson);
        formApiInstance.postBatchRequest( 'ExpensesTable', tableAsJson, id);
    }
    render() {
        let { abbottExpensesReport, user } = this.props;
        return (
            <div className='Form MainScreen mui-container-fluid'>
                <form className='Form-container AbbottExpensesReport' action="#">
                    <div className='mui-row'>
                        <div className='mui-col-md-6 mui-paddingFix'>
                            <span className='Form-text Form-title'>Img</span>
                            <span className='Form-text Form-state'>Estado: {abbottExpensesReport.get('estado')}</span>
                        </div>
                        <div className='mui-col-md-6 mui-paddingFix'>
                            <Liquidation state={abbottExpensesReport} form={form} className='Form-liquidation' />
                        </div>
                    </div>
                    <div className='mui-row'>
                        <div className='Form-fieldSet'>
                            <div className='mui-row'>
                                <div className='mui-col-md-8 mui-paddingFix'>
                                    <DateInput className='' label='Fecha Solicitud:' stringDate={abbottExpensesReport.get('fecha')} form={form} input='fecha'/>
                                    <TextInput label='Nombre del Solicitante:' value={abbottExpensesReport.get('solicitante')} id='solicitante' form={form} className='Form-textInputBox Form-seventy'/>
                                    <TextInput label='Puesto:' value={abbottExpensesReport.get('puesto')} id='puesto' form={form} className='Form-textInputBox Form-seventy'/>
                                    <TextInput label='Pais - Presupuesto:' value={abbottExpensesReport.get('pais')} id='pais' form={form} className='Form-textInputBox Form-seventy'/>
                                </div>
                                <div className='mui-col-md-4 mui-paddingFix'>
                                    <Dropdown options={expenseType} label='Tipo de Gasto' selected={abbottExpensesReport.get('tipoDeGasto')} input='tipoDeGasto' form={form} />
                                </div>   
                            </div>
                            <div className='mui-row'> 
                                <span className='Divider-blue'></span>
                                <span className='Form-label Form-label--leftAlign'>Descripcion del gasto (Motivo del gasto):</span>
                                <TextBoxInput rows='3' id='descripcion' value={abbottExpensesReport.get('descripcion')} form={form}/>
                                <ExpensesTable list={abbottExpensesReport.get('list')} form={form} input='list' className='Table'/>
                                <span className='Form-label Form-label--leftAlign'>TOTAL EN LETRAS:</span>
                                <TextInput label='' value={abbottExpensesReport.get('totalEnLetras')} id='totalEnLetras' form={form} className='Form-textInputBox'/>
                                <Firm label='Firma de Titular:' user={user.get('displayName')} solicitante={abbottExpensesReport.get('titular')} stringDate={abbottExpensesReport.get('fechaFirmaTitular')} form={form} input='fechaFirmaTitular' />                
                                { (this.props.params.id) ?
                                    <ApproverFirm label='Firma de Autoricacion (Jefatura Inmediata)' aprobador={abbottExpensesReport.get('autorizacion')} aprobado={abbottExpensesReport.get('autorizacionAprobo')} stringDate={abbottExpensesReport.get('fechaFirmaAutorizacion')} form={form} dateInput='fechaFirmaAutorizacion' approveInput='autorizacionAprobo' user={user.get('displayName')} />
                                    :
                                    <Dropdown options={abbottExpensesReport.get('aprobadores')} label='Seleccione Jefatura Inmediata' selected={abbottExpensesReport.get('autorizacion')} input='autorizacion' form={form} />
                                }
                                <Notes notes={notes} className='Note-container--blueBG' />
                                <TextInput label='HACER TRANSFERENCIA A NOMBRE:' value={abbottExpensesReport.get('nombreTransferencia')} id='nombreTransferencia' form={form} className='Form-textInputBox'/>                
                                <TextInput label='CUENTA BANCARIA:' value={abbottExpensesReport.get('cuentaBancaria')} id='cuentaBancaria' form={form} className='Form-textInputBox'/>
                            </div>
                        </div>
                    </div>
                </form>
                { (abbottExpensesReport.get('estado') !== 'Aprobado' && abbottExpensesReport.get('estado') !== 'Rechazado' ) &&
                    <button className="mui-btn mui-btn--primary" onClick={this.handleSubmit.bind(this)}>Enviar</button>
                }
            </div>
        );
    }
}