import React, { Component } from 'react';
import TextInput from '../common/TextInput';
import DateInput from '../common/DateInput';
import RadioInput from '../common/RadioInput';
import CheckboxInput from '../common/CheckboxInput';
import { Checkbox } from 'react-mdl';
import moment from 'moment';

let todayDate = moment();
const booleanOption = [ 'si', 'no'];
const impactpOptiones = [ 'Hospital', 'Regional', 'Nacional'];
const patrocinioIncluye = [ 'Registro/Inscripción', 'Hotel', 'Transporte', 'Comidas'];

const Abbott01 = ({ abbott01 }) => (
    <div className='Form MainScreen'>
        <form className='Form-container' action="#">
            <div className='Form-titleContainer'>
                <span className='Form-text Form-title'>CACMP-DR ABBOTT 001</span>
                <span className='Form-text Form-description'>SOLICITUD DE PATROCINIO</span>
            </div>
            <div className='Form-fieldSet'>
                <TextInput label='Nacional/Local:' className='Form-textInput'/>
                <TextInput label='Internacional:' className='Form-textInput'/>
                <DateInput className='Form-dateInput' label='Fecha de Solicitud:' date={abbott01.get('date')}/>
                <TextInput label='Nombre del solicitate:' className='Form-textInput'/>
                <TextInput label='Unidad de Negocio:' className='Form-textInput'/>
                <TextInput label='Nombre del HCP:' className='Form-textInput'/>
                <TextInput label='Especialidad del HCP:' className='Form-textInput'/>
                <TextInput label='País de Recidencia:' className='Form-textInput'/>
                <RadioInput 
                    label='El HCP es empleado del Gobierno?' 
                    name='gobierno'
                    selected='si'
                    options={booleanOption}/>
                <TextInput label='Nombre de la Institución/Hospital:' className='Form-textInput'/>
                <TextInput label='Puesto/Rol en el Gobierno:' className='Form-textInput'/>
                <RadioInput 
                    label='El  HPC es un empleado de gobierno que toma decisiones o tiene influcencia en las decisiones relacionadas a compras, inclusion de productos en formularios, políticas publicas de salud, registro de productos, or cualquier otra actividad que pueda impactar el negocio?' 
                    name='impacto'
                    selected='si'
                    options={booleanOption}/>
                <RadioInput 
                    label='Estas decisiones estan relacionadas a nivel Local, Regional o Nacional con los Hospitales?' 
                    name='escala'
                    selected='Hospital'
                    options={impactpOptiones}/>
                <TextInput label='Asociación Medica a la cual pertenece el HCP:' className='Form-textInput'/>
                <TextInput label='Responsabilidades Academicas, si aplica:' className='Form-textInput'/>
                <CheckboxInput 
                    className='Form-checkboxContainer--fourOption'
                    label='El patrocinio incluye:'
                    options={patrocinioIncluye}/>
                <RadioInput 
                    label='El HCP fue patrocinado previamente?:' 
                    name='previoPatrocinio'
                    selected='si'
                    options={booleanOption}/>
                <TextInput label='Nombre del evento/congreso al cual fue patrocinado previamente:' className='Form-textInput'/>
                <TextInput label='Lugal del evento/congreso a donde fue patrocinado previamente:' className='Form-textInput'/>
                <CheckboxInput 
                    className='Form-checkboxContainer--singleOption'
                    label='El Congreso/evento es consistente con las áreas terapeuticas de interés de Abbott' />
                <CheckboxInput 
                    className='Form-checkboxContainer--singleOption'
                    label='El contenido del Congreso/Evento está alineado con la especialidad/área práctica del HCP' />
                <CheckboxInput 
                    className='Form-checkboxContainer--singleOption'
                    label='El Congreso/evento tiene un fuerte y lefítimo contenido científico' />
                <CheckboxInput 
                    className='Form-checkboxContainer--singleOption'
                    label='El HCP tiene una necesidad lefítima de entrenamiento/educación.' />
                <CheckboxInput 
                    className='Form-checkboxContainer--singleOption'
                    label='El HCP compartirá el conocimiento y actualización adquirida con otros HCPs en su país.' />
                <CheckboxInput 
                    className='Form-checkboxContainer--singleOption'
                    label='Es necesario en el país incrementar el conocimiento sobre esta área terapeútica.' />
                <TextInput label='Nombre del Congreso:' className='Form-textInput'/>
                <TextInput label='Pais/Cuidad:' className='Form-textInput'/>
                <TextInput label='Lugar:' className='Form-textInput'/>
                <DateInput className='Form-dateInput' label='Fecha de Inicio:' date={todayDate}/>
                <DateInput className='Form-dateInput' label='Fecha de Finalizacion:' date={todayDate}/>
            </div>
        </form>
    </div>
);

export default Abbott01;