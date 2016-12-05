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
import MetadataFields from '../common/MetadataFields';
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
        let keysNames = ['localidad','fecha','nombreDelSolicitante','unidadDeNegocio','nombreHcp','especialidadHcp','paisDeResidencia','empleadoDelGobierno','nombreDelHospital','rolEnGobierno','impacto', 'escala',
                         'asociacion', 'responsabilidades', 'pratrocinioIncluye', 'patrocinadoPreviamente', 'nombrePatrocinioPrevio', 'lugarPatrocinioPrevio', 'congreso', 'nombreDelCongreso', 'paisCiudad', 'lugar', 'fechaDeInicio',
                         'fechaDeFinalizacion', 'gerenteDeDistrito', 'fechaGerenteDeDistrito', 'gerenteDelPais', 'fechaGerenteDelPais', 'gerenteDeProducto', 'fechaGerenteDeProducto', 'gerenteDeProductoAprobo', 'directorLegal',
                         'fechaDirectoLegal', 'directorLegalAprobo', 'gerenteGeneral', 'fechaGerenteGeneral', 'gerenteGeneralAprobo', 'estado', 'registro', 'transporte', 'hotel','comidas', 'eventoConsistente', 'contenidoDeEspecialidad', 'contenidoFuerte',
                         'hcpNecesidadLegitima', 'hcpCompartira', 'conocimientoNecesario', 'gerenteDeDistritoAprobo', 'gerenteDelPaisAprobo', 'comentarioRechazo', 'paisProceso', 'divisionProceso', 'productoProceso'];
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
            formState = this.props.formState;    
        } else {
            formState = this.props.formState.set('estado', 'Pendiente').set('fecha', moment().toISOString());
        }
        formState = formState.delete('paises').delete('divisiones').delete('productos');
        formApiInstance.postData(sharepointUrl,
            'Abbott01',
            'Abbott011',
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
                <form className='Form-container Abbott01' action="#">
                    <div className='Form-titleContainer'>
                        <span className='Form-text Form-title'>CACMP-DR ABBOTT 001</span>
                        <span className='Form-text Form-state'>Estado: {formState.get('estado')}</span>
                        <span className='Form-text Form-state'>Id: {this.props.params.id}</span>
                        <span className='Form-text Form-description'>SOLICITUD DE PATROCINIO</span>
                    </div>
                    <fieldset className='Form-fieldSet' id='fieldset-to-disable'>
                        <RadioInput 
                            label='' 
                            name='localidad'
                            id='localidad'
                            form={form}
                            selected={formState.get('localidad')}
                            options={localidad}/>
                        <MetadataFields state={formState} form={form} disabled={disableInputs}/>
                        <DateInput className='' label='Fecha de Solicitud:' stringDate={(fecha !== undefined && fecha !== null && fecha !== '') ? moment(fecha) : today } form={form} input='fecha' disabled={true}/>
                        <TextInput label='Nombre del solicitante:' value={formState.get('nombreDelSolicitante')} id='nombreDelSolicitante' form={form} className='Form-textInputBox'/>
                        <TextInput label='Unidad de Negocio:' value={formState.get('unidadDeNegocio')} id='unidadDeNegocio' form={form} className='Form-textInputBox'/>
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
                        <TextInput label='Asociación Medica a la cual pertenece el HCP:' value={formState.get('asociacion')} id='asociacion' form={form} className='Form-textInputBox'/>
                        <TextInput label='Responsabilidades Academicas, si aplica:' value={formState.get('responsabilidades')} id='responsabilidades' form={form} className='Form-textInputBox'/>
                        <span className='Form-label'>El patrocinio incluye:</span>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='Registro/Inscripción'
                            id='registro'
                            value={formState.get('registro')} 
                            form={form}/>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='Hotel'
                            id='hotel'
                            value={formState.get('hotel')} 
                            form={form} />
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='Transporte'
                            id='transporte'
                            value={formState.get('transporte')} 
                            form={form} />
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='Comidas'
                            id='comidas'
                            value={formState.get('comidas')} 
                            form={form} />
                        <RadioInput 
                            label='El HCP fue patrocinado previamente?:' 
                            name='patrocinadoPreviamente'
                            id='patrocinadoPreviamente'
                            form={form}
                            selected={formState.get('patrocinadoPreviamente')}
                            options={booleanOption}/>
                        <TextInput label='Nombre del evento/congreso al cual fue patrocinado previamente:' value={formState.get('nombrePatrocinioPrevio')} id='nombrePatrocinioPrevio' form={form} className='Form-textInputBox'/>
                        <TextInput label='Lugar del evento/congreso a donde fue patrocinado previamente:' value={formState.get('lugarPatrocinioPrevio')} id='lugarPatrocinioPrevio' form={form} className='Form-textInputBox'/>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption Checkbox-container--first'
                            label='El Congreso/evento es consistente con las áreas terapeuticas de interés de Abbott'
                            id='eventoConsistente'
                            value={formState.get('eventoConsistente')} 
                            form={form} />
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='El contenido del Congreso/Evento está alineado con la especialidad/área práctica del HCP'
                            id='contenidoDeEspecialidad'
                            value={formState.get('contenidoDeEspecialidad')} 
                            form={form} />
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='El Congreso/evento tiene un fuerte y legítimo contenido científico'
                            id='contenidoFuerte'
                            value={formState.get('contenidoFuerte')} 
                            form={form} />
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='El HCP tiene una necesidad legítima de entrenamiento/educación.'
                            id='hcpNecesidadLegitima'
                            value={formState.get('hcpNecesidadLegitima')} 
                            form={form} />
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='El HCP compartirá el conocimiento y actualización adquirida con otros HCPs en su país.'
                            id='hcpCompartira'
                            value={formState.get('hcpCompartira')} 
                            form={form} />
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='Es necesario en el país incrementar el conocimiento sobre esta área terapeútica.'
                            id='conocimientoNecesario'
                            value={formState.get('conocimientoNecesario')} 
                            form={form} />
                        <TextInput label='Nombre del Congreso:' value={formState.get('nombreDelCongreso')} id='nombreDelCongreso' form={form} className='Form-textInputBox'/>
                        <TextInput label='Pais/Cuidad:' value={formState.get('paisCiudad')} id='paisCiudad' form={form} className='Form-textInputBox'/>
                        <TextInput label='Lugar:' value={formState.get('lugar')} id='lugar' form={form} className='Form-textInputBox'/>
                        <DateInput className='Form-dateInput--marginright' label='Fecha de Inicio:' stringDate={formState.get('fechaDeInicio')} form={form} input='fechaDeInicio' disabled={disableInputs} />
                        <DateInput className='Form-dateInput--marginBottom' label='Fecha de Finalizacion:' stringDate={formState.get('fechaDeFinalizacion')} form={form} input='fechaDeFinalizacion' disabled={disableInputs} />
                    </fieldset>
                    <fieldset className='Form-fieldSet'>
                        <span className='Form-label Form-label--under '>Solicitantes:</span>
                        { (this.props.params.id) ?
                            <ApproverFirm label='Nombre del Gerente de Distrito:' aprobador={formState.get('gerenteDeDistrito')} aprobado={formState.get('gerenteDeDistritoAprobo')} stringDate={formState.get('fechaGerenteDeDistrito')} form={form} dateInput='fechaGerenteDeDistrito' approveInput='gerenteDeDistritoAprobo' user={user.get('displayName')} state={formState}/>
                            :
                            <Dropdown options={formState.get('aprobadores')} label='Seleccione Gerente de Distrito' selected={formState.get('gerenteDeDistrito')} input='gerenteDeDistrito' form={form} />
                        }
                        { (this.props.params.id) ?
                            <ApproverFirm label='Nombre del Gerente del Pais:' aprobador={formState.get('gerenteDelPais')} aprobado={formState.get('gerenteDelPaisAprobo')} stringDate={formState.get('fechaGerenteDelPais')} form={form} dateInput='fechaGerenteDelPais' approveInput='gerenteDelPaisAprobo' user={user.get('displayName')} state={formState}/>
                            :
                            <Dropdown options={formState.get('aprobadores')} label='Seleccione Gerente del Pais' selected={formState.get('gerenteDelPais')} input='gerenteDelPais' form={form} />
                        }
                        <span className='Form-label'>Aprobaciones:</span>
                        { (this.props.params.id) ?
                            <ApproverFirm label='Gerente de producto o unidad de servicio:' aprobador={formState.get('gerenteDeProducto')} aprobado={formState.get('gerenteDeProductoAprobo')} stringDate={formState.get('fechaGerenteDeProducto')} form={form} dateInput='fechaGerenteDeProducto' approveInput='gerenteDeProductoAprobo' user={user.get('displayName')} state={formState}/>
                            :
                            <Dropdown options={formState.get('aprobadores')} label='Seleccione Gerente de Producto' selected={formState.get('gerenteDeProducto')} input='gerenteDeProducto' form={form} />
                        }
                        { (this.props.params.id) ?
                            <ApproverFirm label='*Director Legal:' aprobador={formState.get('directorLegal')} aprobado={formState.get('directorLegalAprobo')} stringDate={formState.get('fechaDirectoLegal')} form={form} dateInput='fechaDirectoLegal' approveInput='directorLegalAprobo' user={user.get('displayName')} state={formState} />
                            :
                            <Dropdown options={formState.get('aprobadores')} label='* Seleccione Director Legal' selected={formState.get('directorLegal')} input='directorLegal' form={form} />
                        }
                        <ApproverFirm label='*Gerente General:' aprobador={formState.get('gerenteGeneral')} aprobado={formState.get('gerenteGeneralAprobo')} stringDate={formState.get('fechaGerenteGeneral')} form={form} dateInput='fechaGerenteGeneral' approveInput='gerenteGeneralAprobo' user={user.get('displayName')} flagGerente={(formState.get('gerenteGeneral') === user.get('displayName') && formState.get('estado') === 'Pendiente' && formState.get('empleadoDelGobierno') === 'Si') ? true : false} state={formState}/>
                        <Notes notes={footNotes}/>
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