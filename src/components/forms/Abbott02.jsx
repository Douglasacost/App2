import React, { Component } from 'react';
import TextInput from '../common/TextInput';
import DateInput from '../common/DateInput';
import RadioInput from '../common/RadioInput';
import Firm from '../common/Firm';
import ApproverFirm from '../common/ApproverFirm';
import Notes from '../common/Notes';
import CheckboxInput from '../common/CheckboxInput';
import TextBoxInput from '../common/TextBoxInput';
import TextInputGroup from '../common/TextInputGroup';
import Dropdown from '../common/Dropdown';
import MetadataFields from '../common/MetadataFields';
import moment from 'moment';

var formApi = require('../../modules/FormApi');
var formApiInstance = new formApi();

var verifyRequired = require('../../modules/RequiredFields');
var verifyRequiredInstance = new verifyRequired();

const sharepointUrl = _spPageContextInfo.webAbsoluteUrl;
let todayDate = moment();
const booleanOption = [ 'Si', 'No'];
const impactOptiones = [ 'Hospital', 'Regional', 'Nacional'];
const footNotes = [
        {
            text: 'Aplican todas las aprobaciones'
        }
];
const form = 'abbott02';
const fieldsToVerify = ['gerenteDeProducto', 'directorLegal', 'gerenteGeneral'];
export default class Abbott02 extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        var formId = this.props.params.id;
        if (formId){
            this.getDataFromList(formId);
        } else {
            formApiInstance.getDataList(sharepointUrl,
                'Approvers',
                form,
                'aprobadores',
                this.props.setField.bind(this)
            );
            formApiInstance.getDataList(sharepointUrl,
                'Paises',
                form,
                'paises',
                this.props.setField.bind(this)
            );
            formApiInstance.getDataList(sharepointUrl,
                'Producto',
                form,
                'productos',
                this.props.setField.bind(this)
            );
            formApiInstance.getDataList(sharepointUrl,
                'Divisiones',
                form,
                'divisiones',
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
        // disable inputs when getting data because they are no longer editable
        let fielsetEl = document.getElementById('fieldset-to-disable');
        fielsetEl.disabled = true;
        let keysNames = ['fecha','nombreHcp','especialidadHcp','paisDeResidencia','empleadoDelGobierno','nombreDelHospital','rolEnGobierno','impacto', 'escala',
                         'decisionNegocio', 'decisionAbbott', 'detalles', 'solicitante', 'fechaFirmaDelSolicitante', 'gerenteDeProducto', 'fechaGerenteDeProducto', 'gerenteDeProductoAprobo', 'directorLegal',
                         'fechaDirectoLegal', 'directorLegalAprobo', 'gerenteGeneral', 'fechaGerenteGeneral', 'gerenteGeneralAprobo', 'estado', 'comentarioRechazo', 'paisProceso', 'divisionProceso', 'productoProceso'];
        let data = formApiInstance.getData(sharepointUrl,
            'Abbott02', 
            keysNames, 
            formId, 
            form, 
            this.props.setFormData.bind(this)
            );
    }
    handlePost(){
        var formApiInstance = new formApi();
        let formState;
        const formId = this.props.params.id;
        if (formId && formId !== undefined && formId !== null && formId !== '' ){
            formState = this.props.formState;    
        } else {
            formState = this.props.formState.set('solicitante', this.props.user.get('displayName')).set('fechaFirmaDelSolicitante', moment().toISOString()).set('estado', 'Pendiente').set('fecha', moment().toISOString());
        }
        formState = formState.delete('paises').delete('divisiones').delete('productos');
        formApiInstance.postData(sharepointUrl,
            'Abbott02',
            'Abbott02',
            formState,
            this.props.params.id
        );
    }
    handleSubmit(e){
        e.preventDefault();
        verifyRequiredInstance.verify(fieldsToVerify,this.props.formState, this.handlePost.bind(this));
    }
    handlePrint(e){
        e.preventDefault();
        window.focus();
        window.print();
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
        let estadoActual = formState.get('estado');
        let disableInputs = (estadoActual !== '' && estadoActual !== undefined && estadoActual !== null) ? true : false ;
        let today = moment();
        return (
            <div className='Form MainScreen'>
                <form className='Form-container Abbott02' action="#">
                    <div className='Form-titleContainer'>
                        <span className='Form-text Form-title'>CACMP-DR ABBOTT 002</span>
                        <span className='Form-text Form-state'>Estado: {formState.get('estado')}</span>
                        <span className='Form-text Form-state'>Id: {this.props.params.id}</span>
                        <span className='Form-text Form-description'>Cuestionario de Diligencia Debida para Individuales </span>
                    </div>
                    <fieldset className='Form-fieldSet' id='fieldset-to-disable'>
                        <MetadataFields state={formState} form={form} disabled={disableInputs}/>
                        <DateInput className='' label='Fecha Cuestionario de Diligencia:' stringDate={(fecha !== undefined && fecha !== null && fecha !== '') ? moment(fecha) : today } form={form} input='fecha' disabled={true}/>
                        <TextInput label='Nombre del HCP:' value={formState.get('nombreHcp')} id='nombreHcp' form={form} className='Form-textInputBox'/>
                        <TextInput label='Especialidad del HCP:' value={formState.get('especialidadHcp')} id='especialidadHcp' form={form} className='Form-textInputBox'/>
                        <TextInput label='País de Residencia:' value={formState.get('paisDeResidencia')} id='paisDeResidencia' form={form} className='Form-textInputBox'/>
                        <RadioInput 
                            label='El HCP es empleado del Gobierno?' 
                            name='empleadoDelGobierno'
                            id='empleadoDelGobierno'
                            form={form}
                            selected={formState.get('empleadoDelGobierno')}
                            options={booleanOption}/>
                        <TextInput label='Nombre de la Institución/Hospital:' value={formState.get('nombreDelHospital')} id='nombreDelHospital' form={form} className='Form-textInputBox'/>
                        <TextInput label='Puesto/Rol en el Gobierno:' value={formState.get('rolEnGobierno')} id='rolEnGobierno' form={form} className='Form-textInputBox'/>
                        <RadioInput 
                            label='El  HPC es un empleado de gobierno que toma decisiones o tiene influcencia en las decisiones relacionadas a compras, inclusion de productos en formularios, políticas publicas de salud, registro de productos, or cualquier otra actividad que pueda impactar el negocio?' 
                            name='impacto'
                            id='impacto'
                            form={form}
                            selected={formState.get('impacto')}
                            options={booleanOption}/>
                        <RadioInput 
                            label='Estas decisiones estan relacionadas a nivel Local, Regional o Nacional con los Hospitales?' 
                            name='escala'
                            id='escala'
                            form={form}
                            selected={formState.get('escala')}
                            options={impactOptiones}/>
                        <RadioInput 
                            label='Tiene alguna decisión que tomar el HCP relacionada los intereses del negocio?' 
                            name='decisionNegocio'
                            id='decisionNegocio'
                            form={form}
                            selected={formState.get('decisionNegocio')}
                            options={booleanOption}/>
                        <RadioInput 
                            label='El HCP tomó o influenció alguna decision relacionada con Abbott en los pasados 6 meses o en los siguientes 6 meses?' 
                            name='decisionAbbott'
                            id='decisionAbbott'
                            form={form}
                            selected={formState.get('decisionAbbott')}
                            options={booleanOption}/>
                        <span className='Form-spacer'></span>
                        <span className='Form-label'>En caso de que las respuestas de las ultimas 2 preguntas hayan sido afirmativas, por favor explique a continuacion proporcionando los detalles necesarios:</span>
                        <TextBoxInput rows='3' id='detalles' value={formState.get('detalles')} form={form}/>
                    </fieldset>
                    <fieldset className='Form-fieldSet'>
                        <Firm label='Cuestionario de Diligencia Debida completado por:' user={user.get('displayName')} solicitante={formState.get('solicitante')} stringDate={formState.get('fechaFirmaDelSolicitante')} form={form} input='fechaFirmaDelSolicitante' />
                        <span className='Form-label'>Aprobaciones:</span>
                        { (this.props.params.id) ?
                            <ApproverFirm label='Gerente de producto o unidad de servicio:' aprobador={formState.get('gerenteDeProducto')} aprobado={formState.get('gerenteDeProductoAprobo')} stringDate={formState.get('fechaGerenteDeProducto')} form={form} dateInput='fechaGerenteDeProducto' approveInput='gerenteDeProductoAprobo' user={user.get('displayName')} state={formState}/>
                            :
                            <Dropdown options={formState.get('aprobadores')} label='Seleccione Gerente de Producto' selected={formState.get('gerenteDeProducto')} input='gerenteDeProducto' form={form} />
                        }
                        { (this.props.params.id) ?
                            <ApproverFirm label='Director Legal:' aprobador={formState.get('directorLegal')} aprobado={formState.get('directorLegalAprobo')} stringDate={formState.get('fechaDirectoLegal')} form={form} dateInput='fechaDirectoLegal' approveInput='directorLegalAprobo' user={user.get('displayName')} state={formState}/>
                            :
                            <Dropdown options={formState.get('aprobadores')} label='Seleccione Director Legal' selected={formState.get('directorLegal')} input='directorLegal' form={form} />
                        }
                        <ApproverFirm label='Gerente General:' aprobador={formState.get('gerenteGeneral')} aprobado={formState.get('gerenteGeneralAprobo')} stringDate={formState.get('fechaGerenteGeneral')} form={form} dateInput='fechaGerenteGeneral' approveInput='gerenteGeneralAprobo' user={user.get('displayName')} flagGerente={(formState.get('gerenteGeneral') === user.get('displayName') && formState.get('estado') === 'Pendiente' && formState.get('empleadoDelGobierno') === 'Si') ? true : false} state={formState}/>
                        <Notes notes={footNotes} />
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