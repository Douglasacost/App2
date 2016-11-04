import React, { Component } from 'react';
import TextInput from '../common/TextInput';
import RadioInput from '../common/RadioInput';
import Firm from '../common/Firm';
import Notes from '../common/Notes';
import TextInputGroup from '../common/TextInputGroup';
import Reviewer from '../common/Reviewer';
import moment from 'moment';

let todayDate = moment();
const booleanOption = [ 'si', 'no'];
const impactOptiones = [ 'Hospital', 'Regional', 'Nacional'];
const patrocinioIncluye = [ 'Registro/Inscripción', 'Hotel', 'Transporte', 'Comidas'];
const notes = {
    completeDisclaimer: [{text: 'Por este medio certifico que la información contenida en la presente solicitud está completa y exacta; y en el caso que esta sea aprobada, seré responsable de garantizar su cumplimiento conforme a los términos de dicha aprobación especificados a continuación.'}],
    footNotes: [{text: 'Adjuntar documentos que respalden la excepción.'},
                {text: 'Nota: La aprobación de excepciones está sujeta a reconsideración y/o terminación en el caso de cualquier cambio en las leyes o regulaciones vigentes.'}]
};
const form = 'abbott11';

const Abbott11 = ({ abbott11 }) => (
    <div className='Form MainScreen'>
        <form className='Form-container Abbott11' action="#">
            <div className='Form-titleContainer'>
                <span className='Form-text Form-title'>CACMP-DR ABBOTT 011</span>
                <span className='Form-text Form-description'>SOLICITUD DE EXCEPCIÓN</span>
            </div>
            <div className='Form-fieldSet'>
                <span className='Form-label'>Excepción Solicitada para la Sección: (incluir nombre y especificar la razón de la excepción)</span>
                <TextInput label='' className='Form-textInputBox'/>
                <span className='Form-label'>Base de la Solicitud: (adjuntar cualquier documentación que respalde el presente formulario)</span>
                <TextInput label='' className='Form-textInputBox'/>
                <TextInput label='Division del Solicitante' className='Form-textInputBox'/>
                <Firm label='Nombre del Solicitante' date={todayDate} />
                <Firm label='Gerente de producto o unidad de Negocio:' date={todayDate} />
                <Notes notes={notes.completeDisclaimer} />
                <span className='Form-label'>Revisado por:</span>
                <Reviewer label='Gerente General (o delegado)' date={todayDate} />
                <Reviewer label='Firector Financiero (de acuerdo a lo querido en la politica de la Afiliada):' date={todayDate} />
                <Reviewer label='Gerente de Cumplimiento (de acuerdo a lo querido en la politica de la Afiliada):' date={todayDate} />
                <Reviewer label='Directore Regional de la Oficina de Etica y Cumplimiento (o delegado)' date={todayDate} />
                <Notes notes={notes.footNotes} />
            </div>
        </form>
    </div>
);

export default Abbott11;