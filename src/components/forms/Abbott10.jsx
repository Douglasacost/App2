import React, { Component } from 'react';
import TextInput from '../common/TextInput';
import DateInput from '../common/DateInput';
import RadioInput from '../common/RadioInput';
import Firm from '../common/Firm';
import Notes from '../common/Notes';
import CheckboxInput from '../common/CheckboxInput';
import TextInputGroup from '../common/TextInputGroup';
import NumberInput from '../common/NumberInput';
import TextBoxInput from '../common/TextBoxInput';
import moment from 'moment';

let todayDate = moment();
const footNotes = [
        {
            text: '* El solicitante debe adjuntar los siguientes documentos para el proceso interno:'
        },
        {
            text: '1. Carta de solicitud firmada por el requiriente. '
        },
        {
            text: '2. Formato de Diligencia Debida de la Beca/Donación completado y firmado por el beneficiario.'
        },
        {
            text: '3. Adjuntar documentos de soporte relacionados con la Beca/Donación (ejemplo agenda de los eventos educativos, detalle de las campañas educacionales, etc.)'
        },
        {
            text: '4. Para donaciones de productos Abbott, adjuntar listado de productos, vencimientos, cantidades, presentaciones solicitados por el beneficiario).'
        },
        {
            text: '5. Carta del HCP indicando cómo se utilizarán los productos (sólo para productos de prescripción)'
        },
        {
            text: '*Aprobación en casos de tomadores de decisiones de acuerdo al formato completado por la organización beneficiada.'
        },
        {
            text: '** Aprobaciones aplicables únicamente para donaciones de producto.'
        }
];
const form = 'abbott10';

const Abbott10 = ({ abbott10 }) => (
    <div className='Form MainScreen'>
        <form className='Form-container Abbot01' action="#">
            <div className='Form-titleContainer'>
                <span className='Form-text Form-title'>CACMP-DR ABBOTT 010.1</span>
                <span className='Form-text Form-description'>FORMATO DE SOLICITUD SUBVENCIONES EDUCATIVAS (Becas, Stand, Organizacion de Congresos)/DONACIONES</span>
            </div>
            <div className='Form-fieldSet'>
                <DateInput className='' label='Fecha de Solicitud:' date={abbott10.get('date')} form={form} input='date'/>
                <TextInputGroup fields='Applicant' />
                <TextInput label='Nombre del Beneficiario de la Beca/Donación' className='Form-textInputBox'/>
                <TextInput label='Solicitud de Subvencion Educativa, Beca/Donación' className='Form-textInputBox'/>
                <NumberInput label='Valor de la Beca/Donación' className='Form-textInputBox'/>
                <span className='Form-label'>Descripción del propósito y beneficios de la Beca/Donación:</span>
                <TextBoxInput rows='4' />
                <Firm label='Nombre del Solicitante y Cargo' date={todayDate} />
                <span className='Form-label Form-label--under'>Aprobaciones:</span>
                <Firm label='Gerente de producto o unidad de Negocio:' date={todayDate} />
                <Firm label='Director Legal*' date={todayDate} />
                <Firm label='Director Finanzas**' date={todayDate} />
                <Firm label='Medical**' date={todayDate} />
                <Firm label='Gerente General:' date={todayDate} />
                <Notes notes={footNotes} />
            </div>
        </form>
    </div>
);

export default Abbott10;