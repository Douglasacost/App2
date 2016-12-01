import React, { Component } from 'react';
import TextInput from '../common/TextInput';
import DateInput from '../common/DateInput';
import RadioInput from '../common/RadioInput';
import Firm from '../common/Firm';
import Notes from '../common/Notes';
import CheckboxInput from '../common/CheckboxInput';
import NumberInput from '../common/NumberInput';
import NumericTable from '../common/NumericTable';
import TextBoxInput from '../common/TextBoxInput';
import ActivityPeopleTable from '../common/ActivityPeopleTable';
import Dropdown from '../common/Dropdown';
import ApproverFirm from '../common/ApproverFirm';
import moment from 'moment';

var formApi = require('../../modules/FormApi');
var formApiInstance = new formApi();

const sharepointUrl = _spPageContextInfo.webAbsoluteUrl;
const form = 'abbottObjetivosActividad';
export default class abbottObjetivosActividad extends Component {
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
        // disable inputs when getting data because they are no longer editable
        let fielsetEl = document.getElementById('fieldset-to-disable');
        fielsetEl.disabled = true;
        let keysNames = ['fecha','division','linea','hora','lugar','pais','objetivo','reunionHcp', 'focus',
                         'servicio', 'promocion', 'reunionEmpleados', 'educacionPacientes', 'educacionEmpleados', 'reunionCliente', 'otro', 'otroComentario', 'producto',
                         'material', 'accionesDeSeguimiento', 'comentariosAdicionales', 'montoTotal', 'nombre', 'fechaFirmaVentas', 'gerenteDeDistrito', 'fechaGerenteDeDistrito',
                         'gerenteDeDistritoAprobo', 'estado', 'comentarioRechazo'];
        let data = formApiInstance.getData(sharepointUrl,
            'ObjetivosActividad', 
            keysNames, 
            formId, 
            form, 
            this.props.setFormData.bind(this)
            );
    }
    getTableData(formId){
        let keysNames = ['numero','nombre','empleado','profesionalDeSalud', 'empleadoDelGobierno', 'institucion', 'puesto'];
        let data = formApiInstance.getTableData(
            'participantes', 
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
            formState = this.props.formState;    
        } else {
            formState = this.props.formState.set('nombre', this.props.user.get('displayName')).set('fechaFirmaVentas', moment().toISOString()).set('estado', 'Pendiente').set('fecha', moment().toISOString());
        }
        formState = formState.delete('list');
        formApiInstance.postData(sharepointUrl,
            'ObjetivosActividad',
            'ObjetivosActividad',
            formState,
            this.props.params.id,
            this.handleSubmitTable.bind(this)
        );
    }
    handleSubmitTable(id){
        let tableAsJson = this.props.formState.get('list').toJS();
        console.log(tableAsJson);
        formApiInstance.postBatchRequest( 'participantes', tableAsJson, id);
    }
    handlePrint(e){
        e.preventDefault();
        window.focus();
        window.print();
    }
    render() {
        let { formState, user } = this.props;
        let fecha = formState.get('fecha');
        let today = moment();
        return (
            <div className='Form MainScreen'>
                <form className='Form-container AbbottObjetivosActividad' action="#">
                    <div className='Form-titleContainer'>
                        <span className='Form-text Form-title'>CACMP-DR</span>
                        <span className='Form-text Form-state'>Estado: {formState.get('estado')}</span>
                        <span className='Form-text Form-state'>Id: {this.props.params.id}</span>
                        <span className='Form-text Form-description'>OBJETIVOS DE LA ACTIVIDAD</span>
                    </div>
                    <fieldset className='Form-fieldSet' id='fieldset-to-disable'>
                        <TextInput label='Division:' value={formState.get('division')} id='division' form={form} className='Form-textInputBox'/>
                        <TextInput label='Linea:' value={formState.get('linea')} id='linea' form={form} className='Form-textInputBox'/>
                        <span className='Form-label'>DATOS DEL EVENTO:</span>
                        <DateInput className='' label='Fecha:' stringDate={(fecha !== undefined && fecha !== null && fecha !== '') ? moment(fecha) : today } form={form} input='fecha' disabled={true}/>
                        <NumberInput label='Hora:' id='hora' value={formState.get('hora')} className='Form-textInputBox' form={form}/>
                        <TextInput label='Lugar:' value={formState.get('lugar')} id='lugar' form={form} className='Form-textInputBox'/>
                        <TextInput label='País:' value={formState.get('pais')} id='pais' form={form} className='Form-textInputBox'/>
                        <span className='Form-label'>Objetivo de la actividad o interacción, indicar el nombre del conferencista si aplica:</span>
                        <TextBoxInput rows='3' id='objetivo' value={formState.get('objetivo')} form={form}/>
                        <span className='Form-label'>Participantes (Para actividades o eventos con participación mayor de 4 adjuntar lista de participantes)</span>
                        <ActivityPeopleTable list={formState.get('list')} form={form} input='list' className='Table' state={formState}/>
                        <span className='Form-label'>Tipo de actividad</span>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='Reunion HCP'
                            id='reunionHcp'
                            value={formState.get('reunionHcp')} 
                            form={form}/>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='Focus Group HCP'
                            id='focus'
                            value={formState.get('focus')} 
                            form={form}/>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='Servicio Hospital HCP'
                            id='servicio'
                            value={formState.get('servicio')} 
                            form={form}/>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='Promocion Trade'
                            id='promocion'
                            value={formState.get('promocion')} 
                            form={form}/>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='Reunion Empleados'
                            id='reunionEmpleados'
                            value={formState.get('reunionEmpleados')} 
                            form={form}/>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='Educacion a Pacientes'
                            id='educacionPacientes'
                            value={formState.get('educacionPacientes')} 
                            form={form}/>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='Educacion Empleados'
                            id='educacionEmpleados'
                            value={formState.get('educacionEmpleados')} 
                            form={form}/>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='Reunion Cliente No HCP'
                            id='reunionCliente'
                            value={formState.get('reunionCliente')} 
                            form={form}/>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='otro'
                            id='otro'
                            value={formState.get('otro')} 
                            form={form}/>
                        <TextInput label='otro:' value={formState.get('otroComentario')} id='otroComentario' form={form} className='Form-textInputBox'/>
                        <span className='Form-label'>Productos relacionados, describa:</span>
                        <TextBoxInput rows='3' id='producto' value={formState.get('producto')} form={form}/>
                        <span className='Form-label'>Material Entregado:</span>
                        <TextBoxInput rows='3' id='material' value={formState.get('material')} form={form}/>
                        <span className='Form-label'>Acciones de Seguimient: (Si fueron consideradas)</span>
                        <TextBoxInput rows='3' id='accionesDeSeguimiento' value={formState.get('accionesDeSeguimiento')} form={form}/>
                        <span className='Form-label'>Comentarios Adicionales:</span>
                        <TextBoxInput rows='3' id='comentariosAdicionales' value={formState.get('comentariosAdicionales')} form={form}/>
                        <NumberInput label='Monto Total:' id='montoTotal' value={formState.get('montoTotal')} className='Form-textInputBox' form={form}/>
                    </fieldset>
                    <fieldset className='Form-fieldSet'>
                        <Firm label='Representante de Ventas:' user={user.get('displayName')} solicitante={formState.get('nombre')} stringDate={formState.get('fechaFirmaVentas')} form={form} input='fechaFirmaVentas' />
                        { (this.props.params.id) ?
                            <ApproverFirm label='Nombre del Gerente de Distrito:' aprobador={formState.get('gerenteDeDistrito')} aprobado={formState.get('gerenteDeDistritoAprobo')} stringDate={formState.get('fechaGerenteDeDistrito')} form={form} dateInput='fechaGerenteDeDistrito' approveInput='gerenteDeDistritoAprobo' user={user.get('displayName')} state={formState}/>
                            :
                            <Dropdown options={formState.get('aprobadores')} label='Seleccione Gerente de Distrito' selected={formState.get('gerenteDeDistrito')} input='gerenteDeDistrito' form={form} />
                        }
                        { (formState.get('estado') !== 'Aprobado' && formState.get('estado') !== 'Rechazado' ) ?
                            <button className="mui-btn mui-btn--primary" onClick={this.handleSubmit.bind(this)}>Enviar</button>
                            :
                            <button className="mui-btn mui-btn--primary" onClick={this.handlePrint.bind(this)}>Imprimir</button>
                        }
                    </fieldset>
                </form>
            </div>
        );
    }
}