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
import moment from 'moment';

var formApi = require('../../modules/FormApi');
var formApiInstance = new formApi();

let todayDate = moment();
const booleanOption = [ 'si', 'no'];
const impactOptiones = [ 'Hospital', 'Regional', 'Nacional'];
const footNotes = [
        {
            text: 'Aplican todas las aprobaciones'
        }
];
const form = 'abbott02';
export default class Abbott02 extends Component {
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
        let keysNames = ['fecha','nombreHcp','especialidadHcp','paisDeResidencia','empleadoDelGobierno','nombreDelHospital','rolEnGobierno','impacto', 'escala',
                         'decisionNegocio', 'decisionAbbott', 'detalles', 'solicitante', 'fechaFirmaDelSolicitante', 'gerenteDeProducto', 'fechaGerenteDeProducto', 'gerenteDeProductoAprobo', 'directorLegal',
                         'fechaDirectoLegal', 'directorLegalAprobo', 'gerenteGeneral', 'fechaGerenteGeneral', 'gerenteGeneralAprobo', 'estado'];
        let data = formApiInstance.getData('/sites/forms/',
            'Abbott02', 
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
            formState = this.props.abbott02;    
        } else {
            formState = this.props.abbott02.set('solicitante', this.props.user.get('displayName')).set('fechaFirmaDelSolicitante', moment().toISOString()).set('estado', 'Pendiente');
        }
        formApiInstance.postData('/sites/forms',
            'Abbott02',
            'Abbott02',
            formState,
            this.props.params.id
        );
    }
    render() {
        let { abbott02, user } = this.props;
        return (
            <div className='Form MainScreen'>
                <form className='Form-container Abbott02' action="#">
                    <div className='Form-titleContainer'>
                        <span className='Form-text Form-title'>CACMP-DR ABBOTT 002</span>
                        <span className='Form-text Form-description'>Cuestionario de Diligencia Debida para Individuales </span>
                    </div>
                    <div className='Form-fieldSet'>
                        <DateInput className='' label='Fecha en la que se esta completando el Cuestionario de Diligencia Debida:' stringDate={abbott02.get('fecha')} form={form} input='fecha'/>
                        <TextInput label='Nombre del HCP:' value={abbott02.get('nombreHcp')} id='nombreHcp' form={form} className='Form-textInputBox'/>
                        <TextInput label='Especialidad del HCP:' value={abbott02.get('especialidadHcp')} id='especialidadHcp' form={form} className='Form-textInputBox'/>
                        <TextInput label='País de Residencia:' value={abbott02.get('paisDeResidencia')} id='paisDeResidencia' form={form} className='Form-textInputBox'/>
                        <RadioInput 
                            label='El HCP es empleado del Gobierno?' 
                            name='empleadoDelGobierno'
                            id='empleadoDelGobierno'
                            form={form}
                            selected={abbott02.get('empleadoDelGobierno')}
                            options={booleanOption}/>
                        <TextInput label='Nombre de la Institución/Hospital:' value={abbott02.get('nombreDelHospital')} id='nombreDelHospital' form={form} className='Form-textInputBox'/>
                        <TextInput label='Puesto/Rol en el Gobierno:' value={abbott02.get('rolEnGobierno')} id='rolEnGobierno' form={form} className='Form-textInputBox'/>
                        <RadioInput 
                            label='El  HPC es un empleado de gobierno que toma decisiones o tiene influcencia en las decisiones relacionadas a compras, inclusion de productos en formularios, políticas publicas de salud, registro de productos, or cualquier otra actividad que pueda impactar el negocio?' 
                            name='impacto'
                            id='impacto'
                            form={form}
                            selected={abbott02.get('impacto')}
                            options={booleanOption}/>
                        <RadioInput 
                            label='Estas decisiones estan relacionadas a nivel Local, Regional o Nacional con los Hospitales?' 
                            name='escala'
                            id='escala'
                            form={form}
                            selected={abbott02.get('escala')}
                            options={impactOptiones}/>
                        <RadioInput 
                            label='Tiene alguna decisión que tomar el HCP relacionada los intereses del negocio?' 
                            name='decisionNegocio'
                            id='decisionNegocio'
                            form={form}
                            selected={abbott02.get('decisionNegocio')}
                            options={booleanOption}/>
                        <RadioInput 
                            label='El HCP tomó o influenció alguna decision relacionada con Abbott en los pasados 6 meses o en los siguientes 6 meses?' 
                            name='decisionAbbott'
                            id='decisionAbbott'
                            form={form}
                            selected={abbott02.get('decisionAbbott')}
                            options={booleanOption}/>
                        <span className='Form-label'>En caso de que las respuestas de las ultimas 2 preguntas hayan sido afirmativas, por favor explique a continuacion proporcionando los detalles necesarios:</span>
                        <TextBoxInput rows='3' id='detalles' value={abbott02.get('detalles')} form={form}/>
                        <Firm label='Cuestionario de Diligencia Debida completado por:' user={user.get('displayName')} solicitante={abbott02.get('solicitante')} stringDate={abbott02.get('fechaFirmaDelSolicitante')} form={form} input='fechaFirmaDelSolicitante' />
                        <span className='Form-label'>Aprobaciones:</span>
                        { (this.props.params.id) ?
                            <ApproverFirm label='Gerente de producto o unidad de servicio:' aprobador={abbott02.get('gerenteDeProducto')} aprobado={abbott02.get('gerenteDeProductoAprobo')} stringDate={abbott02.get('fechaGerenteDeProducto')} form={form} dateInput='fechaGerenteDeProducto' approveInput='gerenteDeProductoAprobo' user={user.get('displayName')} />
                            :
                            <Dropdown options={abbott02.get('aprobadores')} label='Seleccione Gerente de Producto' selected={abbott02.get('gerenteDeProducto')} input='gerenteDeProducto' form={form} />
                        }
                        { (this.props.params.id) ?
                            <ApproverFirm label='Director Legal:' aprobador={abbott02.get('directorLegal')} aprobado={abbott02.get('directorLegalAprobo')} stringDate={abbott02.get('fechaDirectoLegal')} form={form} dateInput='fechaDirectoLegal' approveInput='directorLegalAprobo' user={user.get('displayName')} />
                            :
                            <Dropdown options={abbott02.get('aprobadores')} label='Seleccione Director Legal' selected={abbott02.get('directorLegal')} input='directorLegal' form={form} />
                        }
                        { (this.props.params.id)  &&
                            <ApproverFirm label='Gerente General:' aprobador={abbott02.get('gerenteGeneral')} aprobado={abbott02.get('gerenteGeneralAprobo')} stringDate={abbott02.get('fechaGerenteGeneral')} form={form} dateInput='fechaGerenteGeneral' approveInput='gerenteGeneralAprobo' user={user.get('displayName')} />
                        }
                        <Notes notes={footNotes} />
                        { (abbott02.get('estado') !== 'Aprobado' && abbott02.get('estado') !== 'Rechazado' ) &&
                            <button className="mui-btn mui-btn--primary" onClick={this.handleSubmit.bind(this)}>Enviar</button>
                        }
                    </div>
                </form>
            </div>
        );
    }
}