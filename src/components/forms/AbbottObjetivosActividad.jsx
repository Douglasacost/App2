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
import moment from 'moment';

let todayDate = moment();
const activityType = [ 'Reunion HCP', 'Focus Group HCP', 'Servicio Hospital HCP', 'Promocion Trade', 'Reunion Empleados', 'Educacion a Pacientes', 'Educacion Empleados', 'Reunion Cliente No HCP'];

const AbbottObjetivosActividad = ({ abbottObjetivosActividad }) => (
    <div className='Form MainScreen'>
        <form className='Form-container AbbottObjetivosActividad' action="#">
            <div className='Form-titleContainer'>
                <span className='Form-text Form-title'>CACMP-DR</span>
                <span className='Form-text Form-description'>OBJETIVOS DE LA ACTIVIDAD</span>
            </div>
            <div className='Form-fieldSet'>
                <TextInput label='Division:' className='Form-textInputBox'/>
                <TextInput label='Linea:' className='Form-textInputBox'/>
                <span className='Form-label'>DATOS DEL EVENTO:</span>
                <DateInput className='' label='Fecha:' date={abbottObjetivosActividad.get('date')}/>
                <NumberInput label='Hora:' className='Form-textInputBox'/>
                <TextInput label='Lugar:' className='Form-textInputBox'/>
                <TextInput label='Pais:' className='Form-textInputBox'/>
                <span className='Form-label'>Objetivo de la actividad o interacción, indicar el nombre del conferencista si aplica:</span>
                <TextBoxInput rows='4' />
                <span className='Form-label'>Participantes (Para actividades o eventos con participación mayor de 4 adjuntar lista de participantes)</span>
                <ActivityPeopleTable className='Table'/>
                <CheckboxInput 
                    className='Checkbox-container--fourOption'
                    label='Marcar una de las dos op.:'
                    options={activityType}/>
                <TextInput label='otro:' className='Form-textInputBox'/>
                <span className='Form-label'>Productos relacionados, describa:</span>
                <TextBoxInput rows='3' />
                <span className='Form-label'>Material Entregado:</span>
                <TextBoxInput rows='3' />
                <span className='Form-label'>Acciones de Seguimient: (Si fueron consideradas)</span>
                <TextBoxInput rows='3' />
                <span className='Form-label'>Comentarios Adicionales:</span>
                <TextBoxInput rows='3' />
                <NumberInput label='Monto Total:' className='Form-textInputBox'/>
                <span className='Form-label'>Nombre y Firma:</span>
                <Firm label='Representante de Ventas:' date={todayDate} />
                <Firm label='Gerente de Distrito:' date={todayDate} />
            </div>
        </form>
    </div>
);

export default AbbottObjetivosActividad;