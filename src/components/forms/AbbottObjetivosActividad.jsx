import React, { Component } from 'react';
import TextInput from '../common/TextInput';
import DateInput from '../common/DateInput';
import RadioInput from '../common/RadioInput';
import Firm from '../common/Firm';
import Notes from '../common/Notes';
import CheckboxInput from '../common/CheckboxInput';
import NumberInput from '../common/NumberInput';
import NumericTable from '../common/NumericTable';
import TextBoxInput from '../common/TextBoxInput';
import ActivityPeopleTable from '../common/ActivityPeopleTable';
import Dropdown from '../common/Dropdown';
import ApproverFirm from '../common/ApproverFirm';
import moment from 'moment';

var formApi = require('../../modules/FormApi');
var formApiInstance = new formApi();

const sharepointUrl = _spPageContextInfo.webAbsoluteUrl;
const form = 'abbottObjetivosActividad';
export default class abbottObjetivosActividad extends Component {
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
        let keysNames = ['fecha','division','linea','hora','lugar','pais','objetivo','reunionHcp', 'focus',
                         'servicio', 'promocion', 'reunionEmpleados', 'educacionPacientes', 'educacionEmpleados', 'reunionCliente', 'otro', 'otroComentario', 'producto',
                         'material', 'accionesDeSeguimiento', 'comentariosAdicionales', 'montoTotal', 'nombre', 'fechaFirmaVentas', 'gerenteDeDistrito', 'fechaGerenteDeDistrito',
                         'gerenteDeDistritoAprobo', 'estado'];
        let data = formApiInstance.getData(sharepointUrl,
            'ObjetivosActividad', 
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
            formState = this.props.abbottObjetivosActividad;    
        } else {
            formState = this.props.abbottObjetivosActividad.set('nombre', this.props.user.get('displayName')).set('fechaFirmaVentas', moment().toISOString()).set('estado', 'Pendiente');
        }
        formState = formState.delete('list');
        formApiInstance.postData(sharepointUrl,
            'ObjetivosActividad',
            'ObjetivosActividad',
            formState,
            this.props.params.id
        );
    }
    render() {
        let { abbottObjetivosActividad, user } = this.props;
        return (
            <div className='Form MainScreen'>
                <form className='Form-container AbbottObjetivosActividad' action="#">
                    <div className='Form-titleContainer'>
                        <span className='Form-text Form-title'>CACMP-DR</span>
                        <span className='Form-text Form-state'>Estado: {abbottObjetivosActividad.get('estado')}</span>
                        <span className='Form-text Form-description'>OBJETIVOS DE LA ACTIVIDAD</span>
                    </div>
                    <div className='Form-fieldSet'>
                        <TextInput label='Division:' value={abbottObjetivosActividad.get('division')} id='division' form={form} className='Form-textInputBox'/>
                        <TextInput label='Linea:' value={abbottObjetivosActividad.get('linea')} id='linea' form={form} className='Form-textInputBox'/>
                        <span className='Form-label'>DATOS DEL EVENTO:</span>
                        <DateInput className='' label='Fecha:' stringDate={abbottObjetivosActividad.get('fecha')} form={form} input='fecha'/>
                        <NumberInput label='Hora:' id='hora' value={abbottObjetivosActividad.get('hora')} className='Form-textInputBox' form={form}/>
                        <TextInput label='Lugar:' value={abbottObjetivosActividad.get('lugar')} id='lugar' form={form} className='Form-textInputBox'/>
                        <TextInput label='País:' value={abbottObjetivosActividad.get('pais')} id='pais' form={form} className='Form-textInputBox'/>
                        <span className='Form-label'>Objetivo de la actividad o interacción, indicar el nombre del conferencista si aplica:</span>
                        <TextBoxInput rows='3' id='objetivo' value={abbottObjetivosActividad.get('objetivo')} form={form}/>
                        <span className='Form-label'>Participantes (Para actividades o eventos con participación mayor de 4 adjuntar lista de participantes)</span>
                        <ActivityPeopleTable className='Table'/>
                        <span className='Form-label'>Tipo de actividad</span>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='Reunion HCP'
                            id='reunionHcp'
                            value={abbottObjetivosActividad.get('reunionHcp')} 
                            form={form}/>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='Focus Group HCP'
                            id='focus'
                            value={abbottObjetivosActividad.get('focus')} 
                            form={form}/>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='Servicio Hospital HCP'
                            id='servicio'
                            value={abbottObjetivosActividad.get('servicio')} 
                            form={form}/>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='Promocion Trade'
                            id='promocion'
                            value={abbottObjetivosActividad.get('promocion')} 
                            form={form}/>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='Reunion Empleados'
                            id='reunionEmpleados'
                            value={abbottObjetivosActividad.get('reunionEmpleados')} 
                            form={form}/>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='Educacion a Pacientes'
                            id='educacionPacientes'
                            value={abbottObjetivosActividad.get('educacionPacientes')} 
                            form={form}/>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='Educacion Empleados'
                            id='educacionEmpleados'
                            value={abbottObjetivosActividad.get('educacionEmpleados')} 
                            form={form}/>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='Reunion Cliente No HCP'
                            id='reunionCliente'
                            value={abbottObjetivosActividad.get('reunionCliente')} 
                            form={form}/>
                        <CheckboxInput 
                            className='Checkbox-container--singleOption'
                            label='otro'
                            id='otro'
                            value={abbottObjetivosActividad.get('otro')} 
                            form={form}/>
                        <TextInput label='otro:' value={abbottObjetivosActividad.get('otroComentario')} id='otroComentario' form={form} className='Form-textInputBox'/>
                        <span className='Form-label'>Productos relacionados, describa:</span>
                        <TextBoxInput rows='3' id='producto' value={abbottObjetivosActividad.get('producto')} form={form}/>
                        <span className='Form-label'>Material Entregado:</span>
                        <TextBoxInput rows='3' id='material' value={abbottObjetivosActividad.get('material')} form={form}/>
                        <span className='Form-label'>Acciones de Seguimient: (Si fueron consideradas)</span>
                        <TextBoxInput rows='3' id='accionesDeSeguimiento' value={abbottObjetivosActividad.get('accionesDeSeguimiento')} form={form}/>
                        <span className='Form-label'>Comentarios Adicionales:</span>
                        <TextBoxInput rows='3' id='comentariosAdicionales' value={abbottObjetivosActividad.get('comentariosAdicionales')} form={form}/>
                        <NumberInput label='Monto Total:' id='montoTotal' value={abbottObjetivosActividad.get('montoTotal')} className='Form-textInputBox' form={form}/>
                        <Firm label='Representante de Ventas:' user={user.get('displayName')} solicitante={abbottObjetivosActividad.get('nombre')} stringDate={abbottObjetivosActividad.get('fechaFirmaVentas')} form={form} input='fechaFirmaVentas' />
                        { (this.props.params.id) ?
                            <ApproverFirm label='Nombre del Gerente de Distrito:' aprobador={abbottObjetivosActividad.get('gerenteDeDistrito')} aprobado={abbottObjetivosActividad.get('gerenteDeDistritoAprobo')} stringDate={abbottObjetivosActividad.get('fechaGerenteDeDistrito')} form={form} dateInput='fechaGerenteDeDistrito' approveInput='gerenteDeDistritoAprobo' user={user.get('displayName')} />
                            :
                            <Dropdown options={abbottObjetivosActividad.get('aprobadores')} label='Seleccione Gerente de Distrito' selected={abbottObjetivosActividad.get('gerenteDeDistrito')} input='gerenteDeDistrito' form={form} />
                        }
                        { (abbottObjetivosActividad.get('estado') !== 'Aprobado' && abbottObjetivosActividad.get('estado') !== 'Rechazado' ) &&
                            <button className="mui-btn mui-btn--primary" onClick={this.handleSubmit.bind(this)}>Enviar</button>
                        }
                    </div>
                </form>
            </div>
        );
    }
}