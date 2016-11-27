import React, { Component } from 'react';
import TextInput from '../common/TextInput';
import DateInput from '../common/DateInput';
import RadioInput from '../common/RadioInput';
import Firm from '../common/Firm';
import ApproverFirm from '../common/ApproverFirm';
import Notes from '../common/Notes';
import CheckboxInput from '../common/CheckboxInput';
import TextInputGroup from '../common/TextInputGroup';
import Dropdown from '../common/Dropdown';
import moment from 'moment';

var formApi = require('../../modules/FormApi');
var formApiInstance = new formApi();

const sharepointUrl = _spPageContextInfo.webAbsoluteUrl;
let todayDate = moment();
const booleanOption = [ 'Si', 'No'];
const impactOptiones = [ 'Hospital', 'Regional', 'Nacional'];
const localidad = [ 'Nacional/Local', 'Internacional'];
const footNotes = [
        {
            text: '* Requerido para oficiales de Gobierno.'
        },
        {
            text: '*** El solicitante debe adjuntar la agenda/programa del evento.'
        },
        {
            text: 'Nota: En caso que el HCP sea un oficial de Gobierno,  el cuestionario Due Diligence debe ser completado por el solicitante y adjuntarlo aprobado a este formato y completar las aprobaciones indicadas.'
        }
];
const form = 'abbott01';

export default class Abbott01 extends Component {
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
    getDataFromList(formId) {
        console.log('entered get');
        let keysNames = ['localidad','fecha','nombreDelSolicitante','unidadDeNegocio','nombreHcp','especialidadHcp','paisDeResidencia','empleadoDelGobierno','nombreDelHospital','rolEnGobierno','impacto', 'escala',
                         'asociacion', 'responsabilidades', 'pratrocinioIncluye', 'patrocinadoPreviamente', 'nombrePatrocinioPrevio', 'lugarPatrocinioPrevio', 'congreso', 'nombreDelCongreso', 'paisCiudad', 'lugar', 'fechaDeInicio',
                         'fechaDeFinalizacion', 'gerenteDeDistrito', 'fechaGerenteDeDistrito', 'gerenteDelPais', 'fechaGerenteDelPais', 'gerenteDeProducto', 'fechaGerenteDeProducto', 'gerenteDeProductoAprobo', 'directorLegal',
                         'fechaDirectoLegal', 'directorLegalAprobo', 'gerenteGeneral', 'fechaGerenteGeneral', 'gerenteGeneralAprobo', 'estado', 'registro', 'transporte', 'hotel','comidas', 'eventoConsistente', 'contenidoDeEspecialidad', 'contenidoFuerte',
                         'hcpNecesidadLegitima', 'hcpCompartira', 'conocimientoNecesario', 'gerenteDeDistritoAprobo', 'gerenteDelPaisAprobo', 'pais', 'division', 'producto'];
        let data = formApiInstance.getData(sharepointUrl,
            'Abbott01', 
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
            formState = this.props.abbott01;    
        } else {
            formState = this.props.abbott01.set('estado', 'Pendiente').set('fecha', moment().toISOString());
        }
        formApiInstance.postData(sharepointUrl,
            'Abbott01',
            'Abbott011',
            formState,
            this.props.params.id,
            sharepointUrl
        );
    }
    render() {
        let { abbott01, user } = this.props;
        let fecha = abbott01.get('fecha');
        let today = moment();
        return (
            <div className='Form MainScreen'>
                <form className='Form-container Abbott01' action="#">
                    <div className='Form-titleContainer'>
                        <span className='Form-text Form-title'>CACMP-DR ABBOTT 001</span>
                        <span className='Form-text Form-state'>Estado: {abbott01.get('estado')}</span>
                        <span className='Form-text Form-description'>SOLICITUD DE PATROCINIO</span>
                    </div>
                    <div className='Form-fieldSet'>
                        <RadioInput 
                            label='' 
                            name='localidad'
                            id='localidad'
                            form={form}
                            selected={abbott01.get('localidad')}
                            options={localidad}/>
                            <TextInput label='País:' value={abbott01.get('pais')} id='pais' form={form} className='Form-textInputBox'/>
                            <TextInput label='Division:' value={abbott01.get('division')} id='division' form={form} className='Form-textInputBox'/>
                            <TextInput label='Producto:' value={abbott01.get('producto')} id='producto' form={form} className='Form-textInputBox'/>
                        <DateInput className='' label='Fecha de Solicitud:' stringDate={(fecha !== undefined && fecha !== null && fecha !== '') ? moment(fecha) : today } form={form} input='fecha' disabled={true}/>
                        <TextInput label='Nombre del solicitante:' value={abbott01.get('nombreDelSolicitante')} id='nombreDelSolicitante' form={form} className='Form-textInputBox'/>
                        <TextInput label='Unidad de Negocio:' value={abbott01.get('unidadDeNegocio')} id='unidadDeNegocio' form={form} className='Form-textInputBox'/>
                        <TextInput label='Nombre del HCP:' value={abbott01.get('nombreHcp')} id='nombreHcp' form={form} className='Form-textInputBox'/>
                        <TextInput label='Especialidad del HCP:' value={abbott01.get('especialidadHcp')} id='especialidadHcp' form={form} className='Form-textInputBox'/>
                        <TextInput label='País de Residencia:' value={abbott01.get('paisDeResidencia')} id='paisDeResidencia' form={form} className='Form-textInputBox'/>
                        <RadioInput 
                            label='El HCP es empleado del Gobierno?' 
                            name='empleadoDelGobierno'
                            id='empleadoDelGobierno'
                            form={form}
                            selected={abbott01.get('empleadoDelGobierno')}
                            options={booleanOption}/>
                        <TextInput label='Nombre de la Institución/Hospital:' value={abbott01.get('nombreDelHospital')} id='nombreDelHospital' form={form} className='Form-textInputBox'/>
                        <TextInput label='Puesto/Rol en el Gobierno:' value={abbott01.get('rolEnGobierno')} id='rolEnGobierno' form={form} className='Form-textInputBox'/>
                        <RadioInput 
                            label='El  HPC es un empleado de gobierno que toma decisiones o tiene influcencia en las decisiones relacionadas a compras, inclusion de productos en formularios, políticas publicas de salud, registro de productos, or cualquier otra actividad que pueda impactar el negocio?' 
                            name='impacto'
                            id='impacto'
                            form={form}
                            selected={abbott01.get('impacto')}
                            options={booleanOption}/>
                        <RadioInput 
                            label='Estas decisiones estan relacionadas a nivel Local, Regional o Nacional con los Hospitales?' 
                            name='escala'
                            id='escala'
                            form={form}
                            selected={abbott01.get('escala')}
                            options={impactOptiones}/>
                        <TextInput label='Asociación Medica a la cual pertenece el HCP:' value={abbott01.get('asociacion')} id='asociacion' form={form} className='Form-textInputBox'/>
                        <TextInput label='Responsabilidades Academicas, si aplica:' value={abbott01.get('responsabilidades')} id='responsabilidades' form={form} className='Form-textInputBox'/>
                        <span className='Form-label'>El patrocinio incluye:</span>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='Registro/Inscripción'
                            id='registro'
                            value={abbott01.get('registro')} 
                            form={form}/>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='Hotel'
                            id='hotel'
                            value={abbott01.get('hotel')} 
                            form={form} />
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='Transporte'
                            id='transporte'
                            value={abbott01.get('transporte')} 
                            form={form} />
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='Comidas'
                            id='comidas'
                            value={abbott01.get('comidas')} 
                            form={form} />
                        <RadioInput 
                            label='El HCP fue patrocinado previamente?:' 
                            name='patrocinadoPreviamente'
                            id='patrocinadoPreviamente'
                            form={form}
                            selected={abbott01.get('patrocinadoPreviamente')}
                            options={booleanOption}/>
                        <TextInput label='Nombre del evento/congreso al cual fue patrocinado previamente:' value={abbott01.get('nombrePatrocinioPrevio')} id='nombrePatrocinioPrevio' form={form} className='Form-textInputBox'/>
                        <TextInput label='Lugal del evento/congreso a donde fue patrocinado previamente:' value={abbott01.get('lugarPatrocinioPrevio')} id='lugarPatrocinioPrevio' form={form} className='Form-textInputBox'/>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption Checkbox-container--first'
                            label='El Congreso/evento es consistente con las áreas terapeuticas de interés de Abbott'
                            id='eventoConsistente'
                            value={abbott01.get('eventoConsistente')} 
                            form={form} />
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='El contenido del Congreso/Evento está alineado con la especialidad/área práctica del HCP'
                            id='contenidoDeEspecialidad'
                            value={abbott01.get('contenidoDeEspecialidad')} 
                            form={form} />
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='El Congreso/evento tiene un fuerte y legítimo contenido científico'
                            id='contenidoFuerte'
                            value={abbott01.get('contenidoFuerte')} 
                            form={form} />
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='El HCP tiene una necesidad legítima de entrenamiento/educación.'
                            id='hcpNecesidadLegitima'
                            value={abbott01.get('hcpNecesidadLegitima')} 
                            form={form} />
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='El HCP compartirá el conocimiento y actualización adquirida con otros HCPs en su país.'
                            id='hcpCompartira'
                            value={abbott01.get('hcpCompartira')} 
                            form={form} />
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='Es necesario en el país incrementar el conocimiento sobre esta área terapeútica.'
                            id='conocimientoNecesario'
                            value={abbott01.get('conocimientoNecesario')} 
                            form={form} />
                        <TextInput label='Nombre del Congreso:' value={abbott01.get('nombreDelCongreso')} id='nombreDelCongreso' form={form} className='Form-textInputBox'/>
                        <TextInput label='Pais/Cuidad:' value={abbott01.get('paisCiudad')} id='paisCiudad' form={form} className='Form-textInputBox'/>
                        <TextInput label='Lugar:' value={abbott01.get('lugar')} id='lugar' form={form} className='Form-textInputBox'/>
                        <DateInput className='Form-dateInput--marginright' label='Fecha de Inicio:' stringDate={abbott01.get('fechaDeInicio')} form={form} input='fechaDeInicio'/>
                        <DateInput className='Form-dateInput--marginBottom' label='Fecha de Finalizacion:' stringDate={abbott01.get('fechaDeFinalizacion')} form={form} input='fechaDeFinalizacion'/>
                        <span className='Form-label Form-label--under '>Solicitantes:</span>
                        { (this.props.params.id) ?
                            <ApproverFirm label='Nombre del Gerente de Distrito:' aprobador={abbott01.get('gerenteDeDistrito')} aprobado={abbott01.get('gerenteDeDistritoAprobo')} stringDate={abbott01.get('fechaGerenteDeDistrito')} form={form} dateInput='fechaGerenteDeDistrito' approveInput='gerenteDeDistritoAprobo' user={user.get('displayName')} />
                            :
                            <Dropdown options={abbott01.get('aprobadores')} label='Seleccione Gerente de Distrito' selected={abbott01.get('gerenteDeDistrito')} input='gerenteDeDistrito' form={form} />
                        }
                        { (this.props.params.id) ?
                            <ApproverFirm label='Nombre del Gerente del Pais:' aprobador={abbott01.get('gerenteDelPais')} aprobado={abbott01.get('gerenteDelPaisAprobo')} stringDate={abbott01.get('fechaGerenteDelPais')} form={form} dateInput='fechaGerenteDelPais' approveInput='gerenteDelPaisAprobo' user={user.get('displayName')} />
                            :
                            <Dropdown options={abbott01.get('aprobadores')} label='Seleccione Gerente del Pais' selected={abbott01.get('gerenteDelPais')} input='gerenteDelPais' form={form} />
                        }
                        <span className='Form-label'>Aprobaciones:</span>
                        { (this.props.params.id) ?
                            <ApproverFirm label='Gerente de producto o unidad de servicio:' aprobador={abbott01.get('gerenteDeProducto')} aprobado={abbott01.get('gerenteDeProductoAprobo')} stringDate={abbott01.get('fechaGerenteDeProducto')} form={form} dateInput='fechaGerenteDeProducto' approveInput='gerenteDeProductoAprobo' user={user.get('displayName')} />
                            :
                            <Dropdown options={abbott01.get('aprobadores')} label='Seleccione Gerente de Producto' selected={abbott01.get('gerenteDeProducto')} input='gerenteDeProducto' form={form} />
                        }
                        { (this.props.params.id) ?
                            <ApproverFirm label='*Director Legal:' aprobador={abbott01.get('directorLegal')} aprobado={abbott01.get('directorLegalAprobo')} stringDate={abbott01.get('fechaDirectoLegal')} form={form} dateInput='fechaDirectoLegal' approveInput='directorLegalAprobo' user={user.get('displayName')} />
                            :
                            <Dropdown options={abbott01.get('aprobadores')} label='Seleccione Director Legal' selected={abbott01.get('directorLegal')} input='directorLegal' form={form} />
                        }
                        <ApproverFirm label='**Gerente General:' aprobador={abbott01.get('gerenteGeneral')} aprobado={abbott01.get('gerenteGeneralAprobo')} stringDate={abbott01.get('fechaGerenteGeneral')} form={form} dateInput='fechaGerenteGeneral' approveInput='gerenteGeneralAprobo' user={user.get('displayName')} />
                        <Notes notes={footNotes} />
                        { (abbott01.get('estado') !== 'Aprobado' && abbott01.get('estado') !== 'Rechazado' ) &&
                            <button className="mui-btn mui-btn--primary" onClick={this.handleSubmit.bind(this)}>Enviar</button>
                        }
                    </div>
                </form>
            </div>
        );
    }
}