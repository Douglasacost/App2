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
const booleanOption = [ 'si', 'no'];
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

export default class abbott05 extends Component {
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
        let keysNames = ['fecha','nombreDelSolicitante','unidadDeNegocio','nombreHcp','especialidadHcp','paisDeResidencia', 'tipoDeServicio', 'empleadoDelGobierno','nombreDelHospital','rolEnGobierno','impacto', 'escala',
                         'asociacion', 'responsabilidades', 'comentarios', 'experienciaServicio', 'reconocidoLider', 'experienciaSolicitada', 'otros', 'fechaFirmaDelSolicitante', 'gerenteDeDistrito', 'fechaGerenteDeDistrito',
                         'gerenteDeDistritoAprobo', 'gerenteDelPais', 'fechaGerenteDelPais', 'gerenteDelPaisAprobo', 'gerenteDeProducto', 'fechaGerenteDeProducto', 'gerenteDeProductoAprobo', 'directorLegal', 'fechaDirectoLegal',
                         'directorLegalAprobo', 'gerenteMedico', 'fechaGerenteMedico', 'gerenteMedicoAprobo', 'gerenteGeneral', 'fechaGerenteGeneral', 'gerenteGeneralAprobo', 'estado', 'solicitante'
                          ];
        let data = formApiInstance.getData(sharepointUrl,
            'abbott05', 
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
            formState = this.props.abbott05;    
        } else {
            formState = this.props.abbott05.set('solicitante', this.props.user.get('displayName')).set('fechaFirmaDelSolicitante', moment().toISOString()).set('estado', 'Pendiente');
        }
        formApiInstance.postData(sharepointUrl,
            'Abbott05',
            'Abbott05',
            formState,
            this.props.params.id
        );
    }
    render() {
        let { abbott05, user } = this.props;
        return (
            <div className='Form MainScreen'>
                <form className='Form-container Abbot05' action="#">
                    <div className='Form-titleContainer'>
                        <span className='Form-text Form-title'>CACMP-DR ABBOTT 005</span>
                        <span className='Form-text Form-state'>Estado: {abbott05.get('estado')}</span>
                        <span className='Form-text Form-description'>RACIONAL DE SERVICIOS PROFESIONALES A CONTRATAR</span>
                    </div>
                    <div className='Form-fieldSet'>
                        <DateInput className='' label='Fecha de Solicitud:' stringDate={abbott05.get('fecha')} form={form} input='fecha'/>
                        <TextInput label='Nombre del solicitante:' value={abbott05.get('nombreDelSolicitante')} id='nombreDelSolicitante' form={form} className='Form-textInputBox'/>
                        <TextInput label='Unidad de Negocio:' value={abbott05.get('unidadDeNegocio')} id='unidadDeNegocio' form={form} className='Form-textInputBox'/>
                        <TextInput label='Nombre del HCP:' value={abbott05.get('nombreHcp')} id='nombreHcp' form={form} className='Form-textInputBox'/>
                        <TextInput label='Especialidad del HCP:' value={abbott05.get('especialidadHcp')} id='especialidadHcp' form={form} className='Form-textInputBox'/>
                        <TextInput label='País de Residencia:' value={abbott05.get('paisDeResidencia')} id='paisDeResidencia' form={form} className='Form-textInputBox'/>
                        <span className='Form-label'>Indique el tipo de servicio que el HCP proporcionará para Abbott:</span>
                        <TextBoxInput rows='3' id='tipoDeServicio' value={abbott05.get('tipoDeServicio')} form={form}/>
                        <RadioInput 
                            label='El HCP es empleado del Gobierno?' 
                            name='empleadoDelGobierno'
                            id='empleadoDelGobierno'
                            form={form}
                            selected={abbott05.get('empleadoDelGobierno')}
                            options={booleanOption}/>
                        <TextInput label='Nombre de la Institución/Hospital:' value={abbott05.get('nombreDelHospital')} id='nombreDelHospital' form={form} className='Form-textInputBox'/>
                        <TextInput label='Puesto/Rol en el Gobierno:' value={abbott05.get('rolEnGobierno')} id='rolEnGobierno' form={form} className='Form-textInputBox'/>
                        <RadioInput 
                            label='El  HPC es un empleado de gobierno que toma decisiones o tiene influcencia en las decisiones relacionadas a compras, inclusion de productos en formularios, políticas publicas de salud, registro de productos, or cualquier otra actividad que pueda impactar el negocio?' 
                            name='impacto'
                            id='impacto'
                            form={form}
                            selected={abbott05.get('impacto')}
                            options={booleanOption}/>
                        <RadioInput 
                            label='Estas decisiones estan relacionadas a nivel Local, Regional o Nacional con los Hospitales?' 
                            name='escala'
                            id='escala'
                            form={form}
                            selected={abbott05.get('escala')}
                            options={impactOptiones}/>
                        <TextInput label='Asociación Medica a la cual pertenece el HCP:' value={abbott05.get('asociacion')} id='asociacion' form={form} className='Form-textInputBox'/>
                        <TextInput label='Responsabilidades Academicas, si aplica:' value={abbott05.get('responsabilidades')} id='responsabilidades' form={form} className='Form-textInputBox'/>
                        <span className='Form-label'>Incluya comentarios relevantes a la experiencia del HCP (Educación, Investigación Clínica, Publicaciones, Experiencia como Speaker, Influencia como líder de opinión):</span>
                        <TextBoxInput rows='3' id='comentarios' value={abbott05.get('comentarios')} form={form}/>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='La experiencia del HCP esta alineada a la necesidad específica del servicio.'
                            id='experienciaServicio'
                            value={abbott05.get('experienciaServicio')} 
                            form={form}/>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='El HCP es reconocido como un líder de opinión por su conocimiento.'
                            id='reconocidoLider'
                            value={abbott05.get('reconocidoLider')} 
                            form={form} />
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='El HCP cuenta con experiencia para proveer el servicio solicitado por Abbott.'
                            id='experienciaSolicitada'
                            value={abbott05.get('experienciaSolicitada')} 
                            form={form} />
                        <span className='Form-label'>Otros. Explica:</span>
                        <TextBoxInput rows='3' id='otros' value={abbott05.get('otros')} form={form}/>
                        <span className='Form-label'>Solicitantes:</span>
                        <Firm label='Nombre del Solicitante:' user={user.get('displayName')} solicitante={abbott05.get('solicitante')} stringDate={abbott05.get('fechaFirmaDelSolicitante')} form={form} input='fechaFirmaDelSolicitante' />
                        { (this.props.params.id) ?
                            <ApproverFirm label='Nombre del Gerente de Distrito:' aprobador={abbott05.get('gerenteDeDistrito')} aprobado={abbott05.get('gerenteDeDistritoAprobo')} stringDate={abbott05.get('fechaGerenteDeDistrito')} form={form} dateInput='fechaGerenteDeDistrito' approveInput='gerenteDeDistritoAprobo' user={user.get('displayName')} />
                            :
                            <Dropdown options={abbott05.get('aprobadores')} label='Seleccione Gerente de Distrito' selected={abbott05.get('gerenteDeDistrito')} input='gerenteDeDistrito' form={form} />
                        }
                        { (this.props.params.id) ?
                            <ApproverFirm label='Nombre del Gerente del Pais:' aprobador={abbott05.get('gerenteDelPais')} aprobado={abbott05.get('gerenteDelPaisAprobo')} stringDate={abbott05.get('fechaGerenteDelPais')} form={form} dateInput='fechaGerenteDelPais' approveInput='gerenteDelPaisAprobo' user={user.get('displayName')} />
                            :
                            <Dropdown options={abbott05.get('aprobadores')} label='Seleccione Gerente del Pais' selected={abbott05.get('gerenteDelPais')} input='gerenteDelPais' form={form} />
                        }
                        <span className='Form-label'>Aprobaciones:</span>
                        { (this.props.params.id) ?
                            <ApproverFirm label='Gerente de producto o unidad de servicio:' aprobador={abbott05.get('gerenteDeProducto')} aprobado={abbott05.get('gerenteDeProductoAprobo')} stringDate={abbott05.get('fechaGerenteDeProducto')} form={form} dateInput='fechaGerenteDeProducto' approveInput='gerenteDeProductoAprobo' user={user.get('displayName')} />
                            :
                            <Dropdown options={abbott05.get('aprobadores')} label='Seleccione Gerente de Producto' selected={abbott05.get('gerenteDeProducto')} input='gerenteDeProducto' form={form} />
                        }
                        { (this.props.params.id) ?
                            <ApproverFirm label='Gerente Medico:' aprobador={abbott05.get('gerenteMedico')} aprobado={abbott05.get('gerenteMedicoAprobo')} stringDate={abbott05.get('fechaGerenteMedico')} form={form} dateInput='fechaGerenteMedico' approveInput='gerenteMedicoAprobo' user={user.get('displayName')} />
                            :
                            <Dropdown options={abbott05.get('aprobadores')} label='Seleccione Gerente Medico' selected={abbott05.get('gerenteMedico')} input='gerenteMedico' form={form} />
                        }
                        <Notes notes={notes.medicManager} />
                        { (this.props.params.id) ?
                            <ApproverFirm label='Director Legal:' aprobador={abbott05.get('directorLegal')} aprobado={abbott05.get('directorLegalAprobo')} stringDate={abbott05.get('fechaDirectoLegal')} form={form} dateInput='fechaDirectoLegal' approveInput='directorLegalAprobo' user={user.get('displayName')} />
                            :
                            <Dropdown options={abbott05.get('aprobadores')} label='Seleccione Director Legal' selected={abbott05.get('directorLegal')} input='directorLegal' form={form} />
                        }
                        { (this.props.params.id)  &&
                            <ApproverFirm label='Gerente General:' aprobador={abbott05.get('gerenteGeneral')} aprobado={abbott05.get('gerenteGeneralAprobo')} stringDate={abbott05.get('fechaGerenteGeneral')} form={form} dateInput='fechaGerenteGeneral' approveInput='gerenteGeneralAprobo' user={user.get('displayName')} />
                        }
                        <Notes notes={notes.manager} />
                        <Notes notes={notes.footNotes} />
                        { (abbott05.get('estado') !== 'Aprobado' && abbott05.get('estado') !== 'Rechazado' ) &&
                            <button className="mui-btn mui-btn--primary" onClick={this.handleSubmit.bind(this)}>Enviar</button>
                        }
                    </div>
                </form>
            </div>
        );
    }
}