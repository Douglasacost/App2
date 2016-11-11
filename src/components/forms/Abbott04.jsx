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
import moment from 'moment';

let todayDate = moment();
const eventoTo = [ 'Medicos', 'Publico general', 'Farmacias', 'Medios', 'Fuerza de Ventas'];
const planedExpenses = ['Gatos Planificados', 'cantidad'];
const expensesList = [
    'Hotel/Alojamiento',
    'Transporte Aereo',
    'Transporte Terrestre',
    'Registro/Inscripcion',
    'Speakers',
    'Otros Servicios del HCP (por ejemplo, Asesoria, Cong Presidente)',
    'Comidas/Coffee Breaks',
    'Salones de Reuniones y Conferencias',
    'Equipo de Audio y Video',
    'Materiales Promocionales',
    'Otros'
];
const notes = {
        footNotes: [{text: 'Aplican todas las aprobaciones'}],
        districtManager: [{text: '(Cuando el gerente de distrito no es el solicitante)'}],
        medicManager: [{text: '(Aplica para la validación de programas/agendas científicas de congresos  y eventos regionales o locales organizados por Abbott que impliquen la contratación de un HCP).'}],
        manager: [{text: '(Aplica para eventos regionales organizados por Abbott)'}]
};

const Abbott04 = ({ abbott04 }) => (
    <div className='Form MainScreen'>
        <form className='Form-container Abbott04' action="#">
            <div className='Form-titleContainer'>
                <span className='Form-text Form-title'>CACMP-DR ABBOTT 004</span>
                <span className='Form-text Form-description'>Cuestionario de Diligencia Debida para Individuales </span>
            </div>
            <div className='Form-fieldSet'>
                <DateInput className='' label='Fecha de Solicitud' date={abbott04.get('date')}/>
                <TextInput label='Nombre del Evento' id='nombredelevento' className='Form-textInputBox'/>
                <TextInput label='Unidad de Negocio' id='unidaddenegocio' className='Form-textInputBox'/>
                <TextInput label='Evento Nacional/Local o Internacional:' id='localidaddelevento' className='Form-textInputBox'/>
                <span className='Form-label'>Racional del negocio para organizar/patrocinar el evento:</span>
                <TextBoxInput rows='4' id='racionaldelnegocio' />
                <TextInput label='Tipo del Evento' id='tipodeevento' className='Form-textInputBox'/>
                <DateInput className='' label='Fecha del Evento' date={abbott04.get('date')}/>
                <span className='Form-label'>Producto o línea de negocio que patrocina:</span>
                <TextInput label='Lugar' id='productopatrocinado' className='Form-textInputBox'/>
                <NumberInput label='Número de asistentes si es organizado por Abbott:' id='numerodeasistentes' className='Form-textInputBox'/>
                <NumberInput label='Número de HCPs patrocinados si es un Congreso:' id='numerodehcp' className='Form-textInputBox'/>
                <NumberInput label='Número de Empleados de Abbott asistentes:' id='empleadosabbott' className='Form-textInputBox'/>
                <CheckboxInput 
                    className='Checkbox-container--fiveOption'
                    label='Evento dirigido a:'
                    options={eventoTo}/>
                <TextInput label='otro' id='dirigidoaotro' className='Form-textInputBox'/>
                <NumericTable className='Form-expensesTable' headerArray={planedExpenses} fields={expensesList} />
                <TextInput label='Nombre y Cargo del Solicitante' id='nombresolicitante' className='Form-textInputBox'/>
                <TextInput label='Gerente de distrito' id='gerentededistrito' className='Form-textInputBox'/>
                <Notes notes={notes.districtManager} />
                <TextInput label='Gerente de Pais' id='gerentedepais' className='Form-textInputBox'/>
                <span className='Form-label Form-label--under'>Aprobaciones:</span>
                <Firm label='Gerente de Producto o Unidad de Negocio:' date={todayDate} />
                <Firm label='Gerente Medico:' date={todayDate} />
                <Notes notes={notes.medicManager} />
                <Firm label='Gerente General:' date={todayDate} />
                <Notes notes={notes.manager} />
                <Notes notes={notes.footNotes} />
            </div>
        </form>
    </div>
);

export default Abbott04;