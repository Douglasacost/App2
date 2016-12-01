import React, { Component } from 'react';
import TextInput from '../common/TextInput';
import DateInput from '../common/DateInput';
import RadioInput from '../common/RadioInput';
import Firm from '../common/Firm';
import Notes from '../common/Notes';
import CheckboxInput from '../common/CheckboxInput';
import TextInputGroup from '../common/TextInputGroup';
import TextBoxInput from '../common/TextBoxInput';
import Dropdown from '../common/Dropdown';
import ApproverFirm from '../common/ApproverFirm';
import moment from 'moment';

var formApi = require('../../modules/FormApi');
var formApiInstance = new formApi();

const sharepointUrl = _spPageContextInfo.webAbsoluteUrl;
let todayDate = moment();
const booleanOption = [ 'Si', 'No'];
const impactOptiones = [ 'Hospital', 'Regional', 'Nacional'];
const notes = {
        footNotes: [{text: 'El solicitante debe adjuntar el FMV determinado por el servicio contratado de acuerdo a la herramienta vigente, expresado en dólares y moneda local.'},
                    {text: 'En caso que el HCP sea un oficial de Gobierno,  el solicitante debe adjuntar a este documento  el Cuestionario de Diligencia Debida aprobada. '},
                    {text: 'El CV del HCP debe quedar en los archivos de la división o línea de negocio para su consulta en futuras contrataciones y debe actualizarse como mínimo 1 vez al año.'},
                    {text: 'Los honorarios que sean mayores a lo establecido en la herramienta del FMV de la región,  se deberan aprobar completando una excepción.'}],
        medicManager: [{text: '(Aplica para proporcionar orientación al solicitante en la determinación de honorarios a pagar con base en la herramienta del FMV de la región).'}],
        manager: [{text: '*Solo se requiere para oficiales de Gobierno y tomadores de decisiones.'}]
};
const form = 'abbott05';

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
        let fielsetEl = document.getElementById('fieldset-to-disable');
        fielsetEl.disabled = true;
        let keysNames = ['fecha','nombreDelSolicitante','unidadDeNegocio','nombreHcp','especialidadHcp','paisDeResidencia', 'tipoDeServicio', 'empleadoDelGobierno','nombreDelHospital','rolEnGobierno','impacto', 'escala',
                         'asociacion', 'responsabilidades', 'comentarios', 'experienciaServicio', 'reconocidoLider', 'experienciaSolicitada', 'otros', 'fechaFirmaDelSolicitante', 'gerenteDeDistrito', 'fechaGerenteDeDistrito',
                         'gerenteDeDistritoAprobo', 'gerenteDelPais', 'fechaGerenteDelPais', 'gerenteDelPaisAprobo', 'gerenteDeProducto', 'fechaGerenteDeProducto', 'gerenteDeProductoAprobo', 'directorLegal', 'fechaDirectoLegal',
                         'directorLegalAprobo', 'gerenteMedico', 'fechaGerenteMedico', 'gerenteMedicoAprobo', 'gerenteGeneral', 'fechaGerenteGeneral', 'gerenteGeneralAprobo', 'estado', 'solicitante', 'informacionHcp', 'comentarioRechazo'
                          ];
        let data = formApiInstance.getData(sharepointUrl,
            'Abbott05', 
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
        formApiInstance.postData(sharepointUrl,
            'Abbott05',
            'Abbott05',
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
        let today = moment();
        return (
            <div className='Form MainScreen'>
                <form className='Form-container Abbott05' action="#">
                    <div className='Form-titleContainer'>
                        <span className='Form-text Form-title'>CACMP-DR ABBOTT 005</span>
                        <span className='Form-text Form-state'>Estado: {formState.get('estado')}</span>
                        <span className='Form-text Form-state'>Id: {this.props.params.id}</span>
                        <span className='Form-text Form-description'>RACIONAL DE SERVICIOS PROFESIONALES A CONTRATAR</span>
                    </div>
                    <fieldset className='Form-fieldSet' id='fieldset-to-disable'>
                        <DateInput className='' label='Fecha de Solicitud:' stringDate={(fecha !== undefined && fecha !== null && fecha !== '') ? moment(fecha) : today } form={form} input='fecha' disabled={true}/>
                        <TextInput label='Nombre del solicitante:' value={formState.get('nombreDelSolicitante')} id='nombreDelSolicitante' form={form} className='Form-textInputBox'/>
                        <TextInput label='Unidad de Negocio:' value={formState.get('unidadDeNegocio')} id='unidadDeNegocio' form={form} className='Form-textInputBox'/>
                        <TextInput label='Información del HCP:' value={formState.get('informacionHcp')} id='informacionHcp' form={form} className='Form-textInputBox'/>
                        <TextInput label='Nombre:' value={formState.get('nombreHcp')} id='nombreHcp' form={form} className='Form-textInputBox'/>
                        <TextInput label='Especialidad:' value={formState.get('especialidadHcp')} id='especialidadHcp' form={form} className='Form-textInputBox'/>
                        <TextInput label='País de Residencia:' value={formState.get('paisDeResidencia')} id='paisDeResidencia' form={form} className='Form-textInputBox'/>
                        <span className='Form-label'>Indique el tipo de servicio que el HCP proporcionará para Abbott:</span>
                        <TextBoxInput rows='3' id='tipoDeServicio' value={formState.get('tipoDeServicio')} form={form}/>
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
                        <span className='Form-label'>Incluya comentarios relevantes a la experiencia del HCP (Educación, Investigación Clínica, Publicaciones, Experiencia como Speaker, Influencia como líder de opinión):</span>
                        <TextBoxInput rows='3' id='comentarios' value={formState.get('comentarios')} form={form}/>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='La experiencia del HCP esta alineada a la necesidad específica del servicio.'
                            id='experienciaServicio'
                            value={formState.get('experienciaServicio')} 
                            form={form}/>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='El HCP es reconocido como un líder de opinión por su conocimiento.'
                            id='reconocidoLider'
                            value={formState.get('reconocidoLider')} 
                            form={form} />
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='El HCP cuenta con experiencia para proveer el servicio solicitado por Abbott.'
                            id='experienciaSolicitada'
                            value={formState.get('experienciaSolicitada')} 
                            form={form} />
                        <span className='Form-label'>Otros. Explica:</span>
                        <TextBoxInput rows='3' id='otros' value={formState.get('otros')} form={form}/>
                    </fieldset>
                    <fieldset className='Form-fieldSet'>
                        <span className='Form-label'>Solicitantes:</span>
                        <Firm label='Nombre del Solicitante:' user={user.get('displayName')} solicitante={formState.get('solicitante')} stringDate={formState.get('fechaFirmaDelSolicitante')} form={form} input='fechaFirmaDelSolicitante' />
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
                            <ApproverFirm label='Gerente Medico:' aprobador={formState.get('gerenteMedico')} aprobado={formState.get('gerenteMedicoAprobo')} stringDate={formState.get('fechaGerenteMedico')} form={form} dateInput='fechaGerenteMedico' approveInput='gerenteMedicoAprobo' user={user.get('displayName')} state={formState} />
                            :
                            <Dropdown options={formState.get('aprobadores')} label='Seleccione Gerente Medico' selected={formState.get('gerenteMedico')} input='gerenteMedico' form={form} />
                        }
                        <Notes notes={notes.medicManager} />
                        { (this.props.params.id) ?
                            <ApproverFirm label='*Director Legal:' aprobador={formState.get('directorLegal')} aprobado={formState.get('directorLegalAprobo')} stringDate={formState.get('fechaDirectoLegal')} form={form} dateInput='fechaDirectoLegal' approveInput='directorLegalAprobo' user={user.get('displayName')} flagGerente={(formState.get('directorLegal') === user.get('displayName') && formState.get('estado') === 'Pendiente' && formState.get('empleadoDelGobierno') === 'Si') ? true : false} state={formState} />
                            :
                            <Dropdown options={formState.get('aprobadores')} label='Seleccione Director Legal' selected={formState.get('directorLegal')} input='directorLegal' form={form} />
                        }
                        <ApproverFirm label='*Gerente General:' aprobador={formState.get('gerenteGeneral')} aprobado={formState.get('gerenteGeneralAprobo')} stringDate={formState.get('fechaGerenteGeneral')} form={form} dateInput='fechaGerenteGeneral' approveInput='gerenteGeneralAprobo' user={user.get('displayName')} flagGerente={(formState.get('gerenteGeneral') === user.get('displayName') && formState.get('estado') === 'Pendiente' && formState.get('empleadoDelGobierno') === 'Si') ? true : false} state={formState}/>
                        <Notes notes={notes.manager} />
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