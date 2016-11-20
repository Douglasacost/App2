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

let todayDate = moment();
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

export default class Abbott101 extends Component {
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
        let keysNames = ['fecha','nombreDelSolicitante','unidadDeNegocio', 'nombreBeneficiario', 'solicitudDeSubvencion', 'valorDeLaBeca', 'propositoBeneficio', 'solicitante','fechaFirmaDelSolicitante','gerenteDeProducto','fechaGerenteDeProducto','gerenteDeProductoAprobo',
                         'gerenteGeneral', 'fechaGerenteGeneral', 'gerenteGeneralAprobo', 'directorFinanciero', 'fechaDirectorFinanciero', 'directorFinancieroAprobo',
                         'directorLegal', 'fechaDirectoLegal', 'directorLegalAprobo', 'gerenteMedico', 'fechaGerenteMedico', 'gerenteMedicoAprobo',
                         'estado'];
        let data = formApiInstance.getData('/sites/forms/',
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
            formState = this.props.abbott101;    
        } else {
            formState = this.props.abbott101.set('solicitante', this.props.user.get('displayName')).set('fechaFirmaDelSolicitante', moment().toISOString()).set('estado', 'Pendiente');
        }
        formApiInstance.postData('/sites/forms',
            'Abbott101',
            'Abbott101',
            formState,
            this.props.params.id
        );
    }
    render() {
        let { abbott101, user } = this.props;
        return (
            <div className='Form MainScreen'>
                <form className='Form-container Abbott101' action="#">
                    <div className='Form-titleContainer'>
                        <span className='Form-text Form-title'>CACMP-DR ABBOTT 010.1</span>
                        <span className='Form-text Form-state'>Estado: {abbott101.get('estado')}</span>
                        <span className='Form-text Form-description'>FORMATO DE SOLICITUD SUBVENCIONES EDUCATIVAS (Becas, Stand, Organizacion de Congresos)/DONACIONES</span>
                    </div>
                    <div className='Form-fieldSet'>
                        <DateInput className='' label='Fecha de Solicitud:' stringDate={abbott101.get('fecha')} form={form} input='fecha'/>
                        <TextInput label='Nombre del solicitante:' value={abbott101.get('nombreDelSolicitante')} id='nombreDelSolicitante' form={form} className='Form-textInputBox'/>
                        <TextInput label='Unidad de Negocio:' value={abbott101.get('unidadDeNegocio')} id='unidadDeNegocio' form={form} className='Form-textInputBox'/>
                        <TextInput label='Nombre del Beneficiario de la Beca/Donación' value={abbott101.get('nombreBeneficiario')} id='nombreBeneficiario' form={form} className='Form-textInputBox'/>
                        <TextInput label='Solicitud de Subvencion Educativa, Beca/Donación' value={abbott101.get('solicitudDeSubvencion')} id='solicitudDeSubvencion' form={form} className='Form-textInputBox'/>
                        <NumberInput label='Valor de la Beca/Donación' id='valorDeLaBeca' value={abbott101.get('valorDeLaBeca')} className='Form-textInputBox' form={form}/>
                        <span className='Form-label'>Descripción del propósito y beneficios de la Beca/Donación:</span>
                        <TextBoxInput rows='4' id='propositoBeneficio' value={abbott101.get('propositoBeneficio')} form={form}/>
                        <Firm label='Nombre del Solicitante:' user={user.get('displayName')} solicitante={abbott101.get('solicitante')} stringDate={abbott101.get('fechaFirmaDelSolicitante')} form={form} input='fechaFirmaDelSolicitante' />
                        <span className='Form-label Form-label--under'>Aprobaciones:</span>
                        { (this.props.params.id) ?
                            <ApproverFirm label='Gerente de producto o unidad de negocio:' aprobador={abbott101.get('gerenteDeProducto')} aprobado={abbott101.get('gerenteDeProductoAprobo')} stringDate={abbott101.get('fechaGerenteDeProducto')} form={form} dateInput='fechaGerenteDeProducto' approveInput='gerenteDeProductoAprobo' user={user.get('displayName')} />
                            :
                            <Dropdown options={abbott101.get('aprobadores')} label='Seleccione Gerente de Producto' selected={abbott101.get('gerenteDeProducto')} input='gerenteDeProducto' form={form} />
                        }
                        { (this.props.params.id) ?
                            <ApproverFirm label='Director Legal*:' aprobador={abbott101.get('directorLegal')} aprobado={abbott101.get('directorLegalAprobo')} stringDate={abbott101.get('fechaDirectoLegal')} form={form} dateInput='fechaDirectoLegal' approveInput='directorLegalAprobo' user={user.get('displayName')} />
                            :
                            <Dropdown options={abbott101.get('aprobadores')} label='Seleccione Director Legal' selected={abbott101.get('directorLegal')} input='directorLegal' form={form} />
                        }
                        { (this.props.params.id) ?
                            <ApproverFirm label='Director Finanzas**' aprobador={abbott101.get('directorFinanciero')} aprobado={abbott101.get('directorFinancieroAprobo')} stringDate={abbott101.get('fechaDirectorFinanciero')} form={form} dateInput='fechaDirectorFinanciero' approveInput='directorFinancieroAprobo' user={user.get('displayName')} />
                            :
                            <Dropdown options={abbott101.get('aprobadores')} label='Select Finance Signature' selected={abbott101.get('directorFinanciero')} input='directorFinanciero' form={form} />
                        }
                        { (this.props.params.id) ?
                            <ApproverFirm label='Medical**:' aprobador={abbott101.get('gerenteMedico')} aprobado={abbott101.get('gerenteMedicoAprobo')} stringDate={abbott101.get('fechaGerenteMedico')} form={form} dateInput='fechaGerenteMedico' approveInput='gerenteMedicoAprobo' user={user.get('displayName')} />
                            :
                            <Dropdown options={abbott101.get('aprobadores')} label='Seleccione Gerente Medico' selected={abbott101.get('gerenteMedico')} input='gerenteMedico' form={form} />
                        }
                        { (this.props.params.id)  &&
                            <ApproverFirm label='Gerente General:' aprobador={abbott101.get('gerenteGeneral')} aprobado={abbott101.get('gerenteGeneralAprobo')} stringDate={abbott101.get('fechaGerenteGeneral')} form={form} dateInput='fechaGerenteGeneral' approveInput='gerenteGeneralAprobo' user={user.get('displayName')} />
                        }
                        <Notes notes={footNotes} />
                        { (abbott101.get('estado') !== 'Aprobado' && abbott101.get('estado') !== 'Rechazado' ) &&
                            <button className="mui-btn mui-btn--primary" onClick={this.handleSubmit.bind(this)}>Enviar</button>
                        }
                    </div>
                </form>
            </div>
        );
    }
}