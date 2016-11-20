import React, { Component } from 'react';
import TextInput from '../common/TextInput';
import RadioInput from '../common/RadioInput';
import Firm from '../common/Firm';
import Notes from '../common/Notes';
import TextInputGroup from '../common/TextInputGroup';
import Reviewer from '../common/Reviewer';
import Dropdown from '../common/Dropdown';
import ApproverFirm from '../common/ApproverFirm';
import moment from 'moment';

var formApi = require('../../modules/FormApi');
var formApiInstance = new formApi();

const booleanOption = [ 'si', 'no'];
const impactOptiones = [ 'Hospital', 'Regional', 'Nacional'];
const patrocinioIncluye = [ 'Registro/Inscripción', 'Hotel', 'Transporte', 'Comidas'];
const notes = {
    completeDisclaimer: [{text: 'Por este medio certifico que la información contenida en la presente solicitud está completa y exacta; y en el caso que esta sea aprobada, seré responsable de garantizar su cumplimiento conforme a los términos de dicha aprobación especificados a continuación.'}],
    footNotes: [{text: 'Adjuntar documentos que respalden la excepción.'},
                {text: 'Nota: La aprobación de excepciones está sujeta a reconsideración y/o terminación en el caso de cualquier cambio en las leyes o regulaciones vigentes.'}]
};
const form = 'abbott11';

export default class Abbott11 extends Component {
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
        let keysNames = ['seccion','base','division','solicitante','fechaFirmaDelSolicitante','gerenteDeProducto','fechaGerenteDeProducto','gerenteDeProductoAprobo',
                         'gerenteGeneral', 'fechaGerenteGeneral', 'gerenteGeneralAprobo', 'directorFinanciero', 'fechaDirectorFinanciero', 'directorFinancieroAprobo',
                         'gerenteCumplimiento', 'fechaGerenteCumplimiento', 'gerenteCumplimientoAprobo', 'directorRegional', 'fechaDirectorRegional', 'directorRegionalAprobo',
                         'estado'];
        let data = formApiInstance.getData('/sites/forms/',
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
            formState = this.props.abbott11;    
        } else {
            formState = this.props.abbott11.set('solicitante', this.props.user.get('displayName')).set('fechaFirmaDelSolicitante', moment().toISOString()).set('estado', 'Pendiente');
        }
        formApiInstance.postData('/sites/forms',
            'Abbott11',
            'Abbott11',
            formState,
            this.props.params.id
        );
    }
    render() {
        let { abbott11, user } = this.props;
        return (
            <div className='Form MainScreen'>
                <form className='Form-container Abbott11' action="#">
                    <div className='Form-titleContainer'>
                        <span className='Form-text Form-title'>CACMP-DR ABBOTT 011</span>
                        <span className='Form-text Form-state'>Estado: {abbott11.get('estado')}</span>
                        <span className='Form-text Form-description'>SOLICITUD DE EXCEPCIÓN</span>
                    </div>
                    <div className='Form-fieldSet'>
                        <span className='Form-label'>Excepción Solicitada para la Sección: (incluir nombre y especificar la razón de la excepción)</span>
                        <TextInput label='' value={abbott11.get('seccion')} id='seccion' form={form} className='Form-textInputBox'/>
                        <span className='Form-label'>Base de la Solicitud: (adjuntar cualquier documentación que respalde el presente formulario)</span>
                        <TextInput label='' value={abbott11.get('base')} id='base' form={form} className='Form-textInputBox'/>
                        <TextInput label='Division del Solicitante' value={abbott11.get('division')} id='division' form={form} className='Form-textInputBox'/>
                        <Firm label='Nombre del Solicitante:' user={user.get('displayName')} solicitante={abbott11.get('solicitante')} stringDate={abbott11.get('fechaFirmaDelSolicitante')} form={form} input='fechaFirmaDelSolicitante' />
                        { (this.props.params.id) ?
                            <ApproverFirm label='Gerente de producto o unidad de servicio:' aprobador={abbott11.get('gerenteDeProducto')} aprobado={abbott11.get('gerenteDeProductoAprobo')} stringDate={abbott11.get('fechaGerenteDeProducto')} form={form} dateInput='fechaGerenteDeProducto' approveInput='gerenteDeProductoAprobo' user={user.get('displayName')} />
                            :
                            <Dropdown options={abbott11.get('aprobadores')} label='Seleccione Gerente de Producto' selected={abbott11.get('gerenteDeProducto')} input='gerenteDeProducto' form={form} />
                        }
                        <Notes notes={notes.completeDisclaimer} />
                        <span className='Form-label'>Revisado por:</span>
                        { (this.props.params.id)  &&
                            <ApproverFirm label='Gerente General:' aprobador={abbott11.get('gerenteGeneral')} aprobado={abbott11.get('gerenteGeneralAprobo')} stringDate={abbott11.get('fechaGerenteGeneral')} form={form} dateInput='fechaGerenteGeneral' approveInput='gerenteGeneralAprobo' user={user.get('displayName')} />
                        }
                        { (this.props.params.id) ?
                            <ApproverFirm label='Director Financiero (de acuerdo a lo querido en la politica de la Afiliada):' aprobador={abbott11.get('directorFinanciero')} aprobado={abbott11.get('directorFinancieroAprobo')} stringDate={abbott11.get('fechaDirectorFinanciero')} form={form} dateInput='fechaDirectorFinanciero' approveInput='directorFinancieroAprobo' user={user.get('displayName')} />
                            :
                            <Dropdown options={abbott11.get('aprobadores')} label='Seleccione Gerente de Producto' selected={abbott11.get('directorFinanciero')} input='directorFinanciero' form={form} />
                        }
                        { (this.props.params.id) ?
                            <ApproverFirm label='Gerente de Cumplimiento (de acuerdo a lo querido en la politica de la Afiliada):' aprobador={abbott11.get('gerenteCumplimiento')} aprobado={abbott11.get('gerenteCumplimientoAprobo')} stringDate={abbott11.get('fechaGerenteCumplimiento')} form={form} dateInput='fechaGerenteCumplimiento' approveInput='gerenteCumplimientoAprobo' user={user.get('displayName')} />
                            :
                            <Dropdown options={abbott11.get('aprobadores')} label='Seleccione Gerente de Producto' selected={abbott11.get('gerenteCumplimiento')} input='gerenteCumplimiento' form={form} />
                        }
                        { (this.props.params.id) ?
                            <ApproverFirm label='Directore Regional de la Oficina de Etica y Cumplimiento (o delegado)' aprobador={abbott11.get('directorRegional')} aprobado={abbott11.get('directorRegionalAprobo')} stringDate={abbott11.get('fechaDirectorRegional')} form={form} dateInput='fechaDirectorRegional' approveInput='directorRegionalAprobo' user={user.get('displayName')} />
                            :
                            <Dropdown options={abbott11.get('aprobadores')} label='Seleccione Gerente de Producto' selected={abbott11.get('directorRegional')} input='directorRegional' form={form} />
                        }
                        <Notes notes={notes.footNotes} />
                        { (abbott11.get('estado') !== 'Aprobado' && abbott11.get('estado') !== 'Rechazado' ) &&
                            <button className="mui-btn mui-btn--primary" onClick={this.handleSubmit.bind(this)}>Enviar</button>
                        }
                    </div>
                </form>
            </div>
        );
    }
}