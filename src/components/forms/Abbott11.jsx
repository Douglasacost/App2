import React, { Component } from 'react';
import TextInput from '../common/TextInput';
import RadioInput from '../common/RadioInput';
import Firm from '../common/Firm';
import Notes from '../common/Notes';
import TextInputGroup from '../common/TextInputGroup';
import Reviewer from '../common/Reviewer';
import DateInput from '../common/DateInput';
import Dropdown from '../common/Dropdown';
import ApproverFirm from '../common/ApproverFirm';
import MetadataFields from '../common/MetadataFields';
import moment from 'moment';

var formApi = require('../../modules/FormApi');
var formApiInstance = new formApi();

const sharepointUrl = _spPageContextInfo.webAbsoluteUrl;
const booleanOption = [ 'Si', 'No'];
const impactOptiones = [ 'Hospital', 'Regional', 'Nacional'];
const patrocinioIncluye = [ 'Registro/Inscripción', 'Hotel', 'Transporte', 'Comidas'];
const notes = {
    completeDisclaimer: [{text: 'Por este medio certifico que la información contenida en la presente solicitud está completa y exacta; y en el caso que esta sea aprobada, seré responsable de garantizar su cumplimiento conforme a los términos de dicha aprobación especificados a continuación.'}],
    footNotes: [{text: 'Adjuntar documentos que respalden la excepción.'},
                {text: 'Nota: La aprobación de excepciones está sujeta a reconsideración y/o terminación en el caso de cualquier cambio en las leyes o regulaciones vigentes.'}]
};
const form = 'abbott11';

export default class formState extends Component {
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
        let keysNames = ['seccion','base', 'nombreDelSolicitante', 'division', 'fecha', 'solicitante','fechaFirmaDelSolicitante','gerenteDeProducto','fechaGerenteDeProducto','gerenteDeProductoAprobo',
                         'gerenteGeneral', 'fechaGerenteGeneral', 'gerenteGeneralAprobo', 'directorFinanciero', 'fechaDirectorFinanciero', 'directorFinancieroAprobo',
                         'gerenteCumplimiento', 'fechaGerenteCumplimiento', 'gerenteCumplimientoAprobo', 'directorRegional', 'fechaDirectorRegional', 'directorRegionalAprobo',
                         'estado', 'condicionesGeneral', 'condicionesFinanciero', 'condicionesCumplimiento', 'condicionesEtica', 'comentarioRechazo', 'paisProceso', 'divisionProceso', 'productoProceso'];
        let data = formApiInstance.getData(sharepointUrl,
            'Abbott11', 
            keysNames, 
            formId, 
            form, 
            this.props.setFormData.bind(this)
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
            formState = this.props.formState.set('solicitante', this.props.user.get('displayName')).set('fechaFirmaDelSolicitante', moment().toISOString()).set('estado', 'Pendiente').set('fecha', moment().toISOString());
        }
        formState = formState.delete('paises').delete('divisiones').delete('productos');
        formApiInstance.postData(sharepointUrl,
            'Abbott11',
            'Abbott11',
            formState,
            this.props.params.id
        );
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
                <form className='Form-container formState' action="#">
                    <div className='Form-titleContainer'>
                        <span className='Form-text Form-title'>CACMP-DR ABBOTT 011</span>
                        <span className='Form-text Form-state'>Estado: {formState.get('estado')}</span>
                        <span className='Form-text Form-state'>Id: {this.props.params.id}</span>
                        <span className='Form-text Form-description'>SOLICITUD DE EXCEPCIÓN</span>
                    </div>
                    <fieldset className='Form-fieldSet' id='fieldset-to-disable'>
                        <MetadataFields state={formState} form={form} disabled={disableInputs}/>
                        <span className='Form-label'>Excepción Solicitada para la Sección: (incluir nombre y especificar la razón de la excepción)</span>
                        <TextInput label='' value={formState.get('seccion')} id='seccion' form={form} className='Form-textInputBox'/>
                        <span className='Form-label'>Base de la Solicitud: (adjuntar cualquier documentación que respalde el presente formulario)</span>
                        <TextInput label='' value={formState.get('base')} id='base' form={form} className='Form-textInputBox'/>
                        <TextInput label='Nombre del solicitante:' value={formState.get('nombreDelSolicitante')} id='nombreDelSolicitante' form={form} className='Form-textInputBox'/>
                        <TextInput label='Division del Solicitante' value={formState.get('division')} id='division' form={form} className='Form-textInputBox'/>
                        <DateInput className='' label='Fecha:' stringDate={(fecha !== undefined && fecha !== null && fecha !== '') ? moment(fecha) : today } form={form} input='fecha' disabled={true}/>
                    </fieldset>
                    <fieldset className='Form-fieldSet'>
                        <Firm label='Nombre del Solicitante:' user={user.get('displayName')} solicitante={formState.get('solicitante')} stringDate={formState.get('fechaFirmaDelSolicitante')} form={form} input='fechaFirmaDelSolicitante' />
                        { (this.props.params.id) ?
                            <ApproverFirm label='Gerente de producto o unidad de servicio:' aprobador={formState.get('gerenteDeProducto')} aprobado={formState.get('gerenteDeProductoAprobo')} stringDate={formState.get('fechaGerenteDeProducto')} form={form} dateInput='fechaGerenteDeProducto' approveInput='gerenteDeProductoAprobo' user={user.get('displayName')} state={formState} />
                            :
                            <Dropdown options={formState.get('aprobadores')} label='Seleccione Gerente de Producto' selected={formState.get('gerenteDeProducto')} input='gerenteDeProducto' form={form} />
                        }
                        <Notes notes={notes.completeDisclaimer} />
                        <span className='Form-label'>Revisado por:</span>
                        <ApproverFirm label='Gerente General:' aprobador={formState.get('gerenteGeneral')} aprobado={formState.get('gerenteGeneralAprobo')} stringDate={formState.get('fechaGerenteGeneral')} form={form} dateInput='fechaGerenteGeneral' approveInput='gerenteGeneralAprobo' user={user.get('displayName')} state={formState} />
                        <TextInput label='Condiciones para aprobación (si aplica):' value={formState.get('condicionesGeneral')} id='condicionesGeneral' form={form} className='Form-textInputBox' disabled={(formState.get('gerenteGeneralAprobo') === 'si' || formState.get('gerenteGeneralAprobo') === 'no' ) ? true : false }/>
                        { (this.props.params.id) ?
                            <div>
                                <ApproverFirm label='Director Financiero (de acuerdo a lo querido en la politica de la Afiliada):' aprobador={formState.get('directorFinanciero')} aprobado={formState.get('directorFinancieroAprobo')} stringDate={formState.get('fechaDirectorFinanciero')} form={form} dateInput='fechaDirectorFinanciero' approveInput='directorFinancieroAprobo' user={user.get('displayName')} state={formState} />
                                <TextInput label='Condiciones para aprobación (si aplica):' value={formState.get('condicionesFinanciero')} id='condicionesFinanciero' form={form} className='Form-textInputBox' disabled={(formState.get('directorFinancieroAprobo') === 'si' || formState.get('directorFinancieroAprobo') === 'no' ) ? true : false }/>
                            </div>
                            :
                            <Dropdown options={formState.get('aprobadores')} label='Seleccione Director Financiero' selected={formState.get('directorFinanciero')} input='directorFinanciero' form={form} />
                        }
                        { (this.props.params.id) ?
                            <div>
                                <ApproverFirm label='Gerente de Cumplimiento (de acuerdo a lo querido en la politica de la Afiliada):' aprobador={formState.get('gerenteCumplimiento')} aprobado={formState.get('gerenteCumplimientoAprobo')} stringDate={formState.get('fechaGerenteCumplimiento')} form={form} dateInput='fechaGerenteCumplimiento' approveInput='gerenteCumplimientoAprobo' user={user.get('displayName')} state={formState} />
                                <TextInput label='Condiciones para aprobación (si aplica):' value={formState.get('condicionesCumplimiento')} id='condicionesCumplimiento' form={form} className='Form-textInputBox' disabled={(formState.get('gerenteCumplimientoAprobo') === 'si' || formState.get('gerenteCumplimientoAprobo') === 'no' ) ? true : false }/>
                            </div>
                            :
                            <Dropdown options={formState.get('aprobadores')} label='Seleccione Gerente de Cumplimiento' selected={formState.get('gerenteCumplimiento')} input='gerenteCumplimiento' form={form} />
                        }
                        { (this.props.params.id) ?
                            <div>
                                <ApproverFirm label='Directore Regional de la Oficina de Etica y Cumplimiento (o delegado)' aprobador={formState.get('directorRegional')} aprobado={formState.get('directorRegionalAprobo')} stringDate={formState.get('fechaDirectorRegional')} form={form} dateInput='fechaDirectorRegional' approveInput='directorRegionalAprobo' user={user.get('displayName')} state={formState} />
                                <TextInput label='Condiciones para aprobación (si aplica):' value={formState.get('condicionesEtica')} id='condicionesEtica' form={form} className='Form-textInputBox' disabled={(formState.get('directorRegionalAprobo') === 'si' || formState.get('directorRegionalAprobo') === 'no' ) ? true : false }/>
                            </div>
                            :
                            <Dropdown options={formState.get('aprobadores')} label='Seleccione Directore Regional de Etica y Cumplimiento' selected={formState.get('directorRegional')} input='directorRegional' form={form} />
                        }
                        <Notes notes={notes.footNotes} />
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