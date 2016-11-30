import React, { Component } from 'react';
import { Map, fromJS, List } from 'immutable';
import TextInput from '../common/TextInput';
import DateInput from '../common/DateInput';
import Firm from '../common/Firm';
import Notes from '../common/Notes';
import TextInputGroup from '../common/TextInputGroup';
import SubsidiaryTable from '../common/SubsidiaryTable';
import NumberInput from '../common/NumberInput';
import moment from 'moment';

var formApi = require('../../modules/FormApi');
var formApiInstance = new formApi();

const sharepointUrl = _spPageContextInfo.webAbsoluteUrl;
const notes = [
        {
            text: 'Certifico que estoy legalmente autorizado proporcionando la siguiente informacion en nombre de mi Organización y confirmo que  de acuerdo a mi conocimiento es exacta.'
        },
        {
            text: 'En caso de que durante el plazo de este proyecto de beca/donación,  la situación de cualquiera de las personas mencionadas tengan algun cambio con respecto a las funciones del gobierno,'
        },
        {
            text: 'yo  informaré  inmediatamente a Abbott.'
        }
];
const form = 'abbott10';

export default class Abbott10 extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        var formId = this.props.params.id;
        if (formId){
            this.getDataFromList(formId);
        }
    }
    getDataFromList(formId) {
        console.log('entered get');
        let keysNames = ['nacional','internacional','fecha','nombreDelSolicitante','unidadDeNegocio','nombreHcp','especialidadHcp','paisDeResidencia','empleadoDelGobierno','nombreDelHospital','rolEnGobierno','impacto', 'escala',
                         'asociacion', 'responsabilidades', 'pratrocinioIncluye', 'patrocinadoPreviamente', 'nombrePatrocinioPrevio', 'lugarPatrocinioPrevio', 'congreso', 'nombreDelCongreso', 'paisCiudad', 'lugar', 'fechaDeInicio',
                         'fechaDeFinalizacion', 'gerenteDeDistrito', 'fechaGerenteDeDistrito', 'gerenteDelPais', 'fechaGerenteDelPais', 'gerenteDeProducto', 'fechaGerenteDeProducto', 'gerenteDeProductoAprobo', 'directorLegal',
                         'fechaDirectoLegal', 'directorLegalAprobo', 'gerenteGeneral', 'fechaGerenteGeneral', 'gerenteGeneralAprobo', 'estado', 'registro', 'transporte', 'hotel','comidas', 'eventoConsistente', 'contenidoDeEspecialidad', 'contenidoFuerte',
                         'hcpNecesidadLegitima', 'hcpCompartira', 'conocimientoNecesario', 'gerenteDeDistritoAprobo', 'gerenteDelPaisAprobo'];
        let data = formApiInstance.getData(sharepointUrl,
            'Abbott10', 
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
            formState = this.props.abbott10;    
        } else {
            formState = this.props.abbott10.set('solicitante', this.props.user.get('displayName')).set('fechaFirmaDelSolicitante', moment().toISOString()).set('estado', 'Pendiente');
        }
        formState = formState.delete('list');
        formApiInstance.postData(sharepointUrl,
            'Abbott10',
            'Abbott10',
            formState,
            this.props.params.id
        );
    }
    handleSubmitTable(e){
        e.preventDefault();
        let tableAsJson = this.props.abbott10.get('list').toJS();
        console.log(tableAsJson);
        formApiInstance.postBatchRequest(tableAsJson);
    }
    render() {
        let { abbott10, user } = this.props;
        return (
            <div className='Form MainScreen'>
                <form className='Form-container Abbott10' action="#">
                    <div className='Form-titleContainer'>
                        <span className='Form-text Form-title'>CACMP-DR ABBOTT 010</span>
                        <span className='Form-text Form-state'>Estado: {abbott10.get('estado')}</span>
                        <span className='Form-text Form-description'>Solicitud de Subvenciones Educativas, Becas/Donaciones a completar por el Beneficiario</span>
                    </div>
                    <fieldset className='Form-fieldSet' id='fieldset-to-disable'>
                        <span className='Form-label'>Con el propósito que Abbott pueda evaluar su solicitud de soporte,  es necesario que complete la siguiente información:</span>
                        <TextInput label='Nombre de la organización/beneficiario:' value={abbott10.get('nombre')} id='nombre' form={form} className='Form-textInputBox'/>
                        <TextInput label='Dirección de la organización/beneficiario:' value={abbott10.get('direccion')} id='direccion' form={form} className='Form-textInputBox'/>
                        <TextInput label='Nombre del contacto de la organización:' value={abbott10.get('nombreContacto')} id='nombreContacto' form={form} className='Form-textInputBox'/>
                        <NumberInput label='Número de telefono de la organización:' id='numeroTelefono'value={abbott10.get('numeroTelefono')} className='Form-textInputBox' form={form}/>
                        <span className='Form-label'>Indique la lista de los nombres y solicitantes de los miembros de la Junta Directiva y/o Comité Ejecutivo:</span>
                        <SubsidiaryTable list={abbott10.get('list')} form={form} input='list' className='Table Table--Subsidiary'/>
                        <Notes notes={notes} />
                        <TextInput label='Cargo:' value={abbott10.get('cargo')} id='cargo' form={form} className='Form-textInputBox'/>
                        <Firm label='Cuestionario de Diligencia Debida completado por:' user={user.get('displayName')} solicitante={abbott10.get('solicitante')} stringDate={abbott10.get('fechaFirmaDelSolicitante')} form={form} input='fechaFirmaDelSolicitante' />
                    </fieldset>
                </form>
                { (abbott10.get('estado') !== 'Aprobado' && abbott10.get('estado') !== 'Rechazado' ) &&
                    <button className="mui-btn mui-btn--primary" onClick={this.handleSubmit.bind(this)}>Enviar</button>
                }
                { (abbott10.get('estado') !== 'Aprobado' && abbott10.get('estado') !== 'Rechazado' ) &&
                    <button className="mui-btn mui-btn--primary" onClick={this.handleSubmitTable.bind(this)}>Enviar</button>
                }
            </div>
        );
    }
}