import React, { Component } from 'react';
import TextInput from '../common/TextInput';
import DateInput from '../common/DateInput';
import RadioInput from '../common/RadioInput';
import Firm from '../common/Firm';
import Notes from '../common/Notes';
import CheckboxInput from '../common/CheckboxInput';
import TextBoxInput from '../common/TextBoxInput';
import TextInputGroup from '../common/TextInputGroup';
import moment from 'moment';

let todayDate = moment();
const booleanOption = [ 'si', 'no'];
const impactOptiones = [ 'Hospital', 'Regional', 'Nacional'];
const footNotes = [
        {
            text: 'Aplican todas las aprobaciones'
        }
];

const Abbott02 = ({ abbott02 }) => (
    <div className='Form MainScreen'>
        <form className='Form-container Abbott02' action="#">
            <div className='Form-titleContainer'>
                <span className='Form-text Form-title'>CACMP-DR ABBOTT 002</span>
                <span className='Form-text Form-description'>Cuestionario de Diligencia Debida para Individuales </span>
            </div>
            <div className='Form-fieldSet'>
                <DateInput className='' label='Fecha en la que se esta completando el Cuestionario de Diligencia Debida:' date={abbott02.get('date')}/>
                <TextInputGroup fields='HCP' />
                <RadioInput 
                    className=''
                    label='El HCP es empleado del Gobierno?' 
                    name='gobierno'
                    selected='si'
                    options={booleanOption}/>
                <TextInput label='Nombre de la Institución/Hospital:' className='Form-textInputBox'/>
                <TextInput label='Puesto/Rol en el Gobierno:' className='Form-textInputBox'/>
                <RadioInput 
                    label='El  HPC es un empleado de gobierno que toma decisiones o tiene influcencia en las decisiones relacionadas a compras, inclusion de productos en formularios, políticas publicas de salud, registro de productos, or cualquier otra actividad que pueda impactar el negocio?' 
                    name='impacto'
                    selected='si'
                    options={booleanOption}/>
                <RadioInput 
                    label='Estas decisiones estan relacionadas a nivel Local, Regional o Nacional con los Hospitales?' 
                    name='escala'
                    selected='Hospital'
                    options={impactOptiones}/>
                <RadioInput 
                    label='Tiene alguna decisión que tomar el HCP relacionada los intereses del negocio?' 
                    name='decisionIntereses'
                    selected='si'
                    options={booleanOption}/>
                <RadioInput 
                    label='El HCP tomó o influenció alguna decision relacionada con Abbott en los pasados 6 meses o en los siguientes 6 meses?' 
                    name='decisionIntereses'
                    selected='si'
                    options={booleanOption}/>
                <span className='Form-label'>En caso de que las respuestas de las ultimas 2 preguntas hayan sido afirmativas, por favor explique a continuacion proporcionando los detalles necesarios:</span>
                <TextBoxInput rows='3' />
                <Firm label='Cuestionario de Diligencia Debida completado por:' date={todayDate} />
                <Firm label='Nombre del Gerente del Pais:' date={todayDate} />
                <Firm label='Gerente de producto o unidad de servicio:' date={todayDate} />
                <Firm label='Director Legal:' date={todayDate} />
                <Firm label='Gerente General:' date={todayDate} />
                <Notes notes={footNotes} />
            </div>
        </form>
    </div>
);

export default Abbott02;