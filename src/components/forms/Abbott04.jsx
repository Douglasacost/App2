import React, { Component } from 'react';
import { Map, fromJS, List } from 'immutable';
import TextInput from '../common/TextInput';
import DateInput from '../common/DateInput';
import RadioInput from '../common/RadioInput';
import Firm from '../common/Firm';
import ApproverFirm from '../common/ApproverFirm';
import Notes from '../common/Notes';
import CheckboxInput from '../common/CheckboxInput';
import NumberInput from '../common/NumberInput';
import NumericTable from '../common/NumericTable';
import TextBoxInput from '../common/TextBoxInput';
import Dropdown from '../common/Dropdown';
import moment from 'moment';

var formApi = require('../../modules/FormApi');
var formApiInstance = new formApi();

const sharepointUrl = _spPageContextInfo.webAbsoluteUrl;
let todayDate = moment();
const eventoTo = [ 'Medicos', 'Publico general', 'Farmacias', 'Medios', 'Fuerza de Ventas'];
const planedExpenses = ['Gatos Planificados', 'Cantidad'];
const booleanOption = [ 'Si', 'No'];
const localidad = [ 'Nacional/Local', 'Internacional'];
const expensesList = List([
    {label: 'Hotel/Alojamiento', id: 'hotel'},
    {label: 'Transporte Aereo', id: 'transporteAereo'},
    {label: 'Transporte Terrestre', id: 'transporteTerrestre'},
    {label: 'Registro/Inscripcion', id: 'registro'},
    {label: 'Speakers', id: 'speakers'},
    {label: 'Otros Servicios del HCP (por ejemplo, Asesoria, Cong Presidente)', id: 'otrosServicios'},
    {label: 'Comidas/Coffee Breaks', id: 'comidas'},
    {label: 'Salones de Reuniones y Conferencias', id: 'salones'},
    {label: 'Equipo de Audio y Video', id: 'equipo'},
    {label: 'Materiales Promocionales', id: 'materiales'},
    {label: 'Otros', id: 'otros'}
]);

const notes = {
    medicManager: [{text: '(Aplica para la validación de programas/agendas científicas de congresos  y eventos regionales o locales organizados por Abbott que impliquen la contratación de un HCP).'}]
};
const form = 'abbott04';
export default class Abbott04 extends Component {
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
        if(this.props.abbott02.get('aprobadores').size > 0 && this.props.abbott02.get('gerenteGeneral') === ''){ this.setGerenteGenetal(); }
    }
    getDataFromList(formId) {
        console.log('entered get');
        let keysNames = ['fecha','nombreDelEvento','unidadDeNegocio','localidadDelEvento','racionalDelNegocio','tipoDeEvento','fechaDelEvento','lugar', 'numeroDeAsistentes',
                         'numeroDeHcp', 'empleadosAbbott', 'aMedicos', 'aPublicoGeneral', 'aFarmacias', 'aMedios', 'aFuerzaDeVentas', 'aOtro', 'hotel',
                         'transporteAereo', 'transporteTerrestre', 'registro', 'speakers', 'otrosServicios', 'comidas', 'salones', 'equipo', 'materiales', 'otros',
                         'solicitante', 'fechaFirmaDelSolicitante', 'gerenteDeProducto', 'fechaGerenteDeProducto', 'gerenteDeProductoAprobo', 'gerenteDeDistrito', 'fechaGerenteDeDistrito',
                         'gerenteDeDistritoAprobo', 'gerenteDelPais', 'fechaGerenteDelPais', 'gerenteDelPaisAprobo', 'gerenteMedico', 'fechaGerenteMedico', 'gerenteMedicoAprobo',
                         'gerenteGeneral', 'fechaGerenteGeneral', 'gerenteGeneralAprobo', 'estado', 'eventos', 'producto', 'comentarioRechazo'];
        let data = formApiInstance.getData(sharepointUrl,
            'Abbott04', 
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
            'Abbott04',
            'Abbott04',
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
                <form className='Form-container Abbott04' action="#">
                    <div className='Form-titleContainer'>
                        <span className='Form-text Form-title'>CACMP-DR ABBOTT 004</span>
                        <span className='Form-text Form-state'>Estado: {formState.get('estado')}</span>
                        <span className='Form-text Form-state'>Id: {this.props.params.id}</span>
                        <span className='Form-text Form-description'>Racional Del Evento</span>
                    </div>
                    <div className='Form-fieldSet'>
                        <DateInput className='' label='Fecha de Solicitud:' stringDate={(fecha !== undefined && fecha !== null && fecha !== '') ? moment(fecha) : today } form={form} input='fecha' disabled={true}/>
                        <RadioInput 
                            label='Eventos regionales organizados por Abbott' 
                            name='eventos'
                            id='eventos'
                            form={form}
                            selected={formState.get('eventos')}
                            options={booleanOption}/>
                        <TextInput label='Nombre del Evento:' value={formState.get('nombreDelEvento')} id='nombreDelEvento' form={form} className='Form-textInputBox'/>
                        <TextInput label='Unidad de Negocio:' value={formState.get('unidadDeNegocio')} id='unidadDeNegocio' form={form} className='Form-textInputBox'/>
                        <RadioInput 
                            label='Evento Nacional/Local o Internacional:' 
                            name='localidadDelEvento'
                            id='localidadDelEvento'
                            form={form}
                            selected={formState.get('localidadDelEvento')}
                            options={localidad}/>
                        <span className='Form-spacer'></span>
                        <span className='Form-label'>Racional del negocio para organizar/patrocinar el evento:</span>
                        <TextBoxInput rows='4' id='racionalDelNegocio' value={formState.get('racionalDelNegocio')} form={form}/>
                        <TextInput label='Tipo del Evento:' value={formState.get('tipoDeEvento')} id='tipoDeEvento' form={form} className='Form-textInputBox'/>
                        <DateInput className='' label='Fecha de Inicio:' stringDate={formState.get('fechaDeInicio')} form={form} input='fechaDeInicio'/>
                        <DateInput className='' label='Fecha de Finalizacion:' stringDate={formState.get('fechaDeFinalizacion')} form={form} input='fechaDeFinalizacion'/>
                        <span className='Form-spacer'></span>
                        <span className='Form-label'>Producto o línea de negocio que patrocina:</span>
                        <TextBoxInput rows='3' id='producto' value={formState.get('producto')} form={form}/>
                        <TextInput label='Lugar' value={formState.get('lugar')} id='lugar' form={form} className='Form-textInputBox'/>
                        <NumberInput label='Número de asistentes si es organizado por Abbott:' id='numeroDeAsistentes' value={formState.get('numeroDeAsistentes')} className='Form-textInputBox' form={form}/>
                        <NumberInput label='Número de HCPs patrocinados si es un Congreso:' id='numeroDeHcp' value={formState.get('numeroDeHcp')} className='Form-textInputBox' form={form}/>
                        <NumberInput label='Número de Empleados de Abbott asistentes:' id='empleadosAbbott' value={formState.get('empleadosAbbott')} className='Form-textInputBox' form={form}/>
                        <span className='Form-label'>Evento dirigido a:</span>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='Medicos'
                            id='aMedicos'
                            value={formState.get('aMedicos')} 
                            form={form}/>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='PublicoGeneral'
                            id='aPublicoGeneral'
                            value={formState.get('aPublicoGeneral')} 
                            form={form}/>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='Farmacias'
                            id='aFarmacias'
                            value={formState.get('aFarmacias')} 
                            form={form}/>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='Medios'
                            id='aMedios'
                            value={formState.get('aMedios')} 
                            form={form}/>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='FuerzaDeVentas'
                            id='aFuerzaDeVentas'
                            value={formState.get('aFuerzaDeVentas')} 
                            form={form}/>
                        <TextInput label='Otro' value={formState.get('aOtro')} id='aOtro' form={form} className='Form-textInputBox'/>
                        <NumericTable className='Form-expensesTable' headerArray={planedExpenses} fields={expensesList} state={formState} form={form}/>
                        <Firm label='Nombre del Solicitante' user={user.get('displayName')} solicitante={formState.get('solicitante')} stringDate={formState.get('fechaFirmaDelSolicitante')} form={form} input='fechaFirmaDelSolicitante' />
                        { (this.props.params.id) ?
                            <ApproverFirm label='Nombre del Gerente de Distrito:' aprobador={formState.get('gerenteDeDistrito')} aprobado={formState.get('gerenteDeDistritoAprobo')} stringDate={formState.get('fechaGerenteDeDistrito')} form={form} dateInput='fechaGerenteDeDistrito' approveInput='gerenteDeDistritoAprobo' user={user.get('displayName')} state={formState} />
                            :
                            <Dropdown options={formState.get('aprobadores')} label='Seleccione Gerente de Distrito' selected={formState.get('gerenteDeDistrito')} input='gerenteDeDistrito' form={form} />
                        }
                        { (this.props.params.id) ?
                            <ApproverFirm label='Nombre del Gerente del Pais:' aprobador={formState.get('gerenteDelPais')} aprobado={formState.get('gerenteDelPaisAprobo')} stringDate={formState.get('fechaGerenteDelPais')} form={form} dateInput='fechaGerenteDelPais' approveInput='gerenteDelPaisAprobo' user={user.get('displayName')} state={formState}/>
                            :
                            <Dropdown options={formState.get('aprobadores')} label='Seleccione Gerente del Pais' selected={formState.get('gerenteDelPais')} input='gerenteDelPais' form={form} />
                        }
                        <span className='Form-label Form-label--under'>Aprobaciones:</span>
                        { (this.props.params.id) ?
                            <ApproverFirm label='Gerente de producto o unidad de Negocio:' aprobador={formState.get('gerenteDeProducto')} aprobado={formState.get('gerenteDeProductoAprobo')} stringDate={formState.get('fechaGerenteDeProducto')} form={form} dateInput='fechaGerenteDeProducto' approveInput='gerenteDeProductoAprobo' user={user.get('displayName')} state={formState}/>
                            :
                            <Dropdown options={formState.get('aprobadores')} label='Seleccione Gerente de Producto' selected={formState.get('gerenteDeProducto')} input='gerenteDeProducto' form={form} />
                        }
                        { (this.props.params.id) ?
                            <ApproverFirm label='Gerente Medico:' aprobador={formState.get('gerenteMedico')} aprobado={formState.get('gerenteMedicoAprobo')} stringDate={formState.get('fechaGerenteMedico')} form={form} dateInput='fechaGerenteMedico' approveInput='gerenteMedicoAprobo' user={user.get('displayName')} state={formState}/>
                            :
                            <Dropdown options={formState.get('aprobadores')} label='Seleccione Gerente Medico' selected={formState.get('gerenteMedico')} input='gerenteMedico' form={form} />
                        }
                        <Notes notes={notes.medicManager} />
                        <ApproverFirm label='Gerente General:' aprobador={formState.get('gerenteGeneral')} aprobado={formState.get('gerenteGeneralAprobo')} stringDate={formState.get('fechaGerenteGeneral')} form={form} dateInput='fechaGerenteGeneral' approveInput='gerenteGeneralAprobo' user={user.get('displayName')} flagGerente={(formState.get('gerenteGeneral') === user.get('displayName') && formState.get('estado') === 'Pendiente' && formState.get('eventos') === 'Si') ? true : false} state={formState}/>
                        { (formState.get('estado') !== 'Aprobado' && formState.get('estado') !== 'Rechazado' ) &&
                            <button className="mui-btn mui-btn--primary" onClick={this.handleSubmit.bind(this)}>Enviar</button>
                        }
                    </div>
                </form>
            </div>
        );
    }
}