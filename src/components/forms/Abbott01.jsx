import React, { Component } from 'react';
import TextInput from '../common/TextInput';
import DateInput from '../common/DateInput';
import RadioInput from '../common/RadioInput';
import Firm from '../common/Firm';
import Notes from '../common/Notes';
import CheckboxInput from '../common/CheckboxInput';
import TextInputGroup from '../common/TextInputGroup';
import { Checkbox } from 'react-mdl';
import moment from 'moment';

let todayDate = moment();
const booleanOption = [ 'si', 'no'];
const impactOptiones = [ 'Hospital', 'Regional', 'Nacional'];
const patrocinioIncluye = [ 'Registro/Inscripción', 'Hotel', 'Transporte', 'Comidas'];
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

const Abbott01 = ({ abbott01 }) => (
    <div className='Form MainScreen'>
        <form className='Form-container Abbot01' action="#">
            <div className='Form-titleContainer'>
                <span className='Form-text Form-title'>CACMP-DR ABBOTT 001</span>
                <span className='Form-text Form-description'>SOLICITUD DE PATROCINIO</span>
            </div>
            <div className='Form-fieldSet'>
                <TextInput label='Nacional/Local:' className='Form-textInputBox'/>
                <TextInput label='Internacional:' className='Form-textInputBox'/>
                <DateInput className='' label='Fecha de Solicitud:' date={abbott01.get('date')} form={form} input='date'/>
                <TextInputGroup fields='Applicant' />
                <TextInputGroup fields='HCP' />
                <RadioInput 
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
                <TextInput label='Asociación Medica a la cual pertenece el HCP:' className='Form-textInputBox'/>
                <TextInput label='Responsabilidades Academicas, si aplica:' className='Form-textInputBox'/>
                <CheckboxInput 
                    className='Checkbox-container--fourOption'
                    label='El patrocinio incluye:'
                    options={patrocinioIncluye}/>
                <RadioInput 
                    label='El HCP fue patrocinado previamente?:' 
                    name='previoPatrocinio'
                    selected='si'
                    options={booleanOption}/>
                <TextInput label='Nombre del evento/congreso al cual fue patrocinado previamente:' className='Form-textInputBox'/>
                <TextInput label='Lugal del evento/congreso a donde fue patrocinado previamente:' className='Form-textInputBox'/>
                <CheckboxInput 
                    className='Checkbox-container--singleOption Checkbox-container--first'
                    label='El Congreso/evento es consistente con las áreas terapeuticas de interés de Abbott' />
                <CheckboxInput 
                    className='Checkbox-container--singleOption'
                    label='El contenido del Congreso/Evento está alineado con la especialidad/área práctica del HCP' />
                <CheckboxInput 
                    className='Checkbox-container--singleOption'
                    label='El Congreso/evento tiene un fuerte y lefítimo contenido científico' />
                <CheckboxInput 
                    className='Checkbox-container--singleOption'
                    label='El HCP tiene una necesidad lefítima de entrenamiento/educación.' />
                <CheckboxInput 
                    className='Checkbox-container--singleOption'
                    label='El HCP compartirá el conocimiento y actualización adquirida con otros HCPs en su país.' />
                <CheckboxInput 
                    className='Checkbox-container--singleOption'
                    label='Es necesario en el país incrementar el conocimiento sobre esta área terapeútica.' />
                <TextInput label='Nombre del Congreso:' className='Form-textInputBox'/>
                <TextInput label='Pais/Cuidad:' className='Form-textInputBox'/>
                <TextInput label='Lugar:' className='Form-textInputBox'/>
                <DateInput className='Form-dateInput' label='Fecha de Inicio:' date={abbott01.get('startDate')} form={form} input='startDate' />
                <DateInput className='Form-dateInput' label='Fecha de Finalizacion:' date={abbott01.get('endDate')} form={form} input='endDate' />
                <span className='Form-label'>Solicitantes:</span>
                <Firm label='Nombre del Gerente de Distrito:' date={todayDate} />
                <Firm label='Nombre del Gerente del Pais:' date={todayDate} />
                <span className='Form-label'>Aprobaciones:</span>
                <Firm label='Gerente de producto o unidad de servicio:' date={todayDate} />
                <Firm label='Director Legal:' date={todayDate} />
                <Firm label='Gerente General:' date={todayDate} />
                <Notes notes={footNotes} />
            </div>
        </form>
    </div>
);

export default Abbott01;