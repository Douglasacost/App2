import React, { Component } from 'react';
import TextInput from '../common/TextInput';
import DateInput from '../common/DateInput';
import RadioInput from '../common/RadioInput';
import Firm from '../common/Firm';
import Notes from '../common/Notes';
import CheckboxInput from '../common/CheckboxInput';
import TextInputGroup from '../common/TextInputGroup';
import TextBoxInput from '../common/TextBoxInput';
import { Checkbox } from 'react-mdl';
import moment from 'moment';

let todayDate = moment();
const booleanOption = [ 'si', 'no'];
const impactOptiones = [ 'Hospital', 'Regional', 'Nacional'];
const notes = {
        footNotes: [{text: 'El solicitante debe adjuntar el FMV determinado por el servicio contratado de acuerdo a la herramienta vigente, expresado en dólares y moneda local.'},
                    {text: 'En caso que el HCP sea un oficial de Gobierno,  el solicitante debe adjuntar a este documento  el Cuestionario de Diligencia Debida aprobada. '},
                    {text: 'El CV del HCP debe quedar en los archivos de la división o línea de negocio para su consulta en futuras contrataciones y debe actualizarse como mínimo 1 vez al año.'},
                    {text: 'Los honorarios que sean mayores a lo establecido en la herramienta del FMV de la región,  se deberan aprobar completando una excepción.'}],
        districtManager: [{text: '(Cuando el gerente de distrito no es el solicitante)'}],
        medicManager: [{text: '(Aplica para proporcionar orientación al solicitante en la determinación de honorarios a pagar con base en la herramienta del FMV de la región).'}],
        manager: [{text: '*Solo se requiere para oficiales de Gobierno y tomadores de decisiones.'}]
};
const form = 'abbott05';

const Abbott05 = ({ abbott05 }) => (
    <div className='Form MainScreen'>
        <form className='Form-container Abbot01' action="#">
            <div className='Form-titleContainer'>
                <span className='Form-text Form-title'>CACMP-DR ABBOTT 005</span>
                <span className='Form-text Form-description'>RACIONAL DE SERVICIOS PROFESIONALES A CONTRATAR</span>
            </div>
            <div className='Form-fieldSet'>
                <DateInput className='' label='Fecha de Solicitud:' date={abbott05.get('date')} form={form} input='date'/>
                <TextInputGroup fields='Applicant' />
                <TextInputGroup fields='HCP' />
                <span className='Form-label'>Indique el tipo de servicio que el HCP proporcionará para Abbott:</span>
                <TextBoxInput rows='3' />
                <RadioInput 
                    label='El HCP es empleado del Gobierno?' 
                    name='gobierno'
                    selected='si'
                    options={booleanOption}/>
                <TextInputGroup fields='Goverment' />
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
                <span className='Form-label'>Incluya comentarios relevantes a la experiencia del HCP (Educación, Investigación Clínica, Publicaciones, Experiencia como Speaker, Influencia como líder de opinión):</span>
                <TextBoxInput rows='3' />
                <CheckboxInput 
                    className='Checkbox-container--singleOption Checkbox-container--first'
                    label='La experiencia del HCP esta alineada a la necesidad específica del servicio.' />
                <CheckboxInput 
                    className='Checkbox-container--singleOption'
                    label='El HCP es reconocido como un líder de opinión por su conocimiento.' />
                <CheckboxInput 
                    className='Checkbox-container--singleOption'
                    label='El HCP cuenta con experiencia para proveer el servicio solicitado por Abbott.' />
                <span className='Form-label'>Otros. Explica:</span>
                <TextBoxInput rows='3' />
                <span className='Form-label'>Solicitantes:</span>
                <Firm label='Nombre del Solicitante:' date={todayDate} />
                <Firm label='Nombre del Gerente de Distrito:' date={todayDate} />
                <Firm label='Nombre del Gerente del Pais:' date={todayDate} />
                <span className='Form-label'>Aprobaciones:</span>
                <Firm label='Gerente de producto o unidad de servicio:' date={todayDate} />
                <Firm label='Gerente Medico:' date={todayDate} />
                <Notes notes={notes.medicManager} />
                <Firm label='Director Legal:' date={todayDate} />
                <Firm label='Gerente General:' date={todayDate} />
                <Notes notes={notes.manager} />
                <Notes notes={notes.footNotes} />
            </div>
        </form>
    </div>
);

export default Abbott05;