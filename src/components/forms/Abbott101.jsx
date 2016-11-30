import React, { Component } from 'react';
import TextInput from '../common/TextInput';
import DateInput from '../common/DateInput';
import RadioInput from '../common/RadioInput';
import Firm from '../common/Firm';
import Notes from '../common/Notes';
import CheckboxInput from '../common/CheckboxInput';
import TextInputGroup from '../common/TextInputGroup';
import NumberInput from '../common/NumberInput';
import TextBoxInput from '../common/TextBoxInput';
import Dropdown from '../common/Dropdown';
import ApproverFirm from '../common/ApproverFirm';
import moment from 'moment';

var formApi = require('../../modules/FormApi');
var formApiInstance = new formApi();

const sharepointUrl = _spPageContextInfo.webAbsoluteUrl;
let todayDate = moment();
const booleanOption = [ 'Si', 'No'];
const footNotes = [
        {
            text: '* El solicitante debe adjuntar los siguientes documentos para el proceso interno:'
        },
        {
            text: '1. Carta de solicitud firmada por el requiriente. '
        },
        {
            text: '2. Formato de Diligencia Debida de la Beca/Donación completado y firmado por el beneficiario.'
        },
        {
            text: '3. Adjuntar documentos de soporte relacionados con la Beca/Donación (ejemplo agenda de los eventos educativos, detalle de las campañas educacionales, etc.)'
        },
        {
            text: '4. Para donaciones de productos Abbott, adjuntar listado de productos, vencimientos, cantidades, presentaciones solicitados por el beneficiario).'
        },
        {
            text: '5. Carta del HCP indicando cómo se utilizarán los productos (sólo para productos de prescripción)'
        },
        {
            text: '*Aprobación en casos de tomadores de decisiones de acuerdo al formato completado por la organización beneficiada.'
        },
        {
            text: '** Aprobaciones aplicables únicamente para donaciones de producto.'
        }
];
const form = 'abbott101';

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
        }
    }
    componentDidUpdate(){
        console.log('component did update');
        if(this.props.formState.get('aprobadores').size > 0 && this.props.formState.get('gerenteGeneral') === ''){ this.setGerenteGenetal(); }
    }
    getDataFromList(formId) {
        console.log('entered get');
        // disable inputs when getting data because they are no longer editable
        document.getElementsByClassName('fieldset-to-disable').disabled = true;
        let keysNames = ['fecha','nombreDelSolicitante','unidadDeNegocio', 'nombreBeneficiario', 'solicitudDeSubvencion', 'valorDeLaBeca', 'propositoBeneficio', 'solicitante','fechaFirmaDelSolicitante','gerenteDeProducto','fechaGerenteDeProducto','gerenteDeProductoAprobo',
                         'gerenteGeneral', 'fechaGerenteGeneral', 'gerenteGeneralAprobo', 'directorFinanciero', 'fechaDirectorFinanciero', 'directorFinancieroAprobo',
                         'directorLegal', 'fechaDirectoLegal', 'directorLegalAprobo', 'gerenteMedico', 'fechaGerenteMedico', 'gerenteMedicoAprobo',
                         'estado', 'donacionProducto', 'comentarioRechazo'];
        let data = formApiInstance.getData(sharepointUrl,
            'Abbott101', 
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
            formState = this.props.formState.set('solicitante', this.props.user.get('displayName')).set('fechaFirmaDelSolicitante', moment().toISOString()).set('estado', 'Pendiente');
        }
        formApiInstance.postData(sharepointUrl,
            'Abbott101',
            'Abbott101',
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
                <form className='Form-container Abbott101' action="#">
                    <div className='Form-titleContainer'>
                        <span className='Form-text Form-title'>CACMP-DR ABBOTT 010.1</span>
                        <span className='Form-text Form-state'>Estado: {formState.get('estado')}</span>
                        <span className='Form-text Form-state'>Id: {this.props.params.id}</span>
                        <span className='Form-text Form-description'>FORMATO DE SOLICITUD SUBVENCIONES EDUCATIVAS (Becas, Stand, Organizacion de Congresos)/DONACIONES</span>
                    </div>
                    <fieldset className='Form-fieldSet' id='fieldset-to-disable'>
                        <DateInput className='' label='Fecha de Solicitud:' stringDate={(fecha !== undefined && fecha !== null && fecha !== '') ? moment(fecha) : today } form={form} input='fecha' disabled={true}/>
                        <TextInput label='Nombre del solicitante:' value={formState.get('nombreDelSolicitante')} id='nombreDelSolicitante' form={form} className='Form-textInputBox'/>
                        <TextInput label='Unidad de Negocio:' value={formState.get('unidadDeNegocio')} id='unidadDeNegocio' form={form} className='Form-textInputBox'/>
                        <RadioInput 
                            label='¿Es  donación de producto?' 
                            name='donacionProducto'
                            id='donacionProducto'
                            form={form}
                            selected={formState.get('donacionProducto')}
                            options={booleanOption}/>
                        <TextInput label='Nombre del Beneficiario de la Beca/Donación' value={formState.get('nombreBeneficiario')} id='nombreBeneficiario' form={form} className='Form-textInputBox'/>
                        <TextInput label='Solicitud de Subvencion Educativa, Beca/Donación' value={formState.get('solicitudDeSubvencion')} id='solicitudDeSubvencion' form={form} className='Form-textInputBox'/>
                        <NumberInput label='Valor de la Beca/Donación' id='valorDeLaBeca' value={formState.get('valorDeLaBeca')} className='Form-textInputBox' form={form}/>
                        <span className='Form-label'>Descripción del propósito y beneficios de la Beca/Donación:</span>
                        <TextBoxInput rows='4' id='propositoBeneficio' value={formState.get('propositoBeneficio')} form={form}/>
                    </fieldset>
                    <fieldset className='Form-fieldSet'>
                        <Firm label='Nombre del Solicitante:' user={user.get('displayName')} solicitante={formState.get('solicitante')} stringDate={formState.get('fechaFirmaDelSolicitante')} form={form} input='fechaFirmaDelSolicitante' />
                        <span className='Form-label Form-label--under'>Aprobaciones:</span>
                        { (this.props.params.id) ?
                            <ApproverFirm label='Gerente de producto o unidad de negocio:' aprobador={formState.get('gerenteDeProducto')} aprobado={formState.get('gerenteDeProductoAprobo')} stringDate={formState.get('fechaGerenteDeProducto')} form={form} dateInput='fechaGerenteDeProducto' approveInput='gerenteDeProductoAprobo' user={user.get('displayName')} state={formState}/>
                            :
                            <Dropdown options={formState.get('aprobadores')} label='Seleccione Gerente de Producto' selected={formState.get('gerenteDeProducto')} input='gerenteDeProducto' form={form} />
                        }
                        { (this.props.params.id) ?
                            <ApproverFirm label='Director Legal*:' aprobador={formState.get('directorLegal')} aprobado={formState.get('directorLegalAprobo')} stringDate={formState.get('fechaDirectoLegal')} form={form} dateInput='fechaDirectoLegal' approveInput='directorLegalAprobo' user={user.get('displayName')} state={formState} />
                            :
                            <Dropdown options={formState.get('aprobadores')} label='Seleccione Director Legal' selected={formState.get('directorLegal')} input='directorLegal' form={form} />
                        }
                        { (this.props.params.id) ?
                            <ApproverFirm label='Director Finanzas**' aprobador={formState.get('directorFinanciero')} aprobado={formState.get('directorFinancieroAprobo')} stringDate={formState.get('fechaDirectorFinanciero')} form={form} dateInput='fechaDirectorFinanciero' approveInput='directorFinancieroAprobo' user={user.get('displayName')} flagGerente={(formState.get('directorLegal') === user.get('displayName') && formState.get('estado') === 'Pendiente' && formState.get('donacionProducto') === 'Si') ? true : false} state={formState}/>
                            :
                            <Dropdown options={formState.get('aprobadores')} label='Seleccione Director Finanzas' selected={formState.get('directorFinanciero')} input='directorFinanciero' form={form} />
                        }
                        { (this.props.params.id) ?
                            <ApproverFirm label='Medical**:' aprobador={formState.get('gerenteMedico')} aprobado={formState.get('gerenteMedicoAprobo')} stringDate={formState.get('fechaGerenteMedico')} form={form} dateInput='fechaGerenteMedico' approveInput='gerenteMedicoAprobo' user={user.get('displayName')} flagGerente={(formState.get('directorLegal') === user.get('displayName') && formState.get('estado') === 'Pendiente' && formState.get('donacionProducto') === 'Si') ? true : false} state={formState}/>
                            :
                            <Dropdown options={formState.get('aprobadores')} label='Seleccione Gerente Medico' selected={formState.get('gerenteMedico')} input='gerenteMedico' form={form} />
                        }
                        <ApproverFirm label='Gerente General:' aprobador={formState.get('gerenteGeneral')} aprobado={formState.get('gerenteGeneralAprobo')} stringDate={formState.get('fechaGerenteGeneral')} form={form} dateInput='fechaGerenteGeneral' approveInput='gerenteGeneralAprobo' user={user.get('displayName')} flagGerente={(formState.get('gerenteGeneral') === user.get('displayName') && formState.get('estado') === 'Pendiente' && formState.get('donacionProducto') === 'Si') ? true : false} state={formState} />
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