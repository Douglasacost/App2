import React, { Component } from 'react';
import TextInput from '../common/TextInput';
import DateInput from '../common/DateInput';
import Firm from '../common/Firm';
import Notes from '../common/Notes';
import TextInputGroup from '../common/TextInputGroup';
import SubsidiaryTable from '../common/SubsidiaryTable';
import moment from 'moment';

let todayDate = moment();
const notes = [
        {
            text: 'Certifico que estoy legalmente autorizado proporcionando la siguiente informacion en nombre de mi Organización y confirmo que  de acuerdo a mi conocimiento es exacta.'
        },
        {
            text: 'En caso de que durante el plazo de este proyecto de beca/donación,  la situación de cualquiera de las personas mencionadas tengan algun cambio con respecto a las funciones del gobierno,'
        }
];
const form = 'abbott10';

const Abbott10 = ({ abbott10 }) => (
    <div className='Form MainScreen'>
        <form className='Form-container Abbot10' action="#">
            <div className='Form-titleContainer'>
                <span className='Form-text Form-title'>CACMP-DR ABBOTT 010</span>
                <span className='Form-text Form-description'>Solicitud de Subvenciones Educativas, Becas/Donaciones a completar por el Beneficiario</span>
            </div>
            <div className='Form-fieldSet'>
                <span className='Form-label'>Con el propósito que Abbott pueda evaluar su solicitud de soporte,  es necesario que complete la siguiente información:</span>
                <TextInput label='Nombre de la organización/beneficiario:' className='Form-textInputBox'/>
                <TextInput label='Dirección de la organización/beneficiario:' className='Form-textInputBox'/>
                <TextInput label='Nombre del contacto de la organización:' className='Form-textInputBox'/>
                <TextInput label='Número de telefono de la organización:' className='Form-textInputBox'/>
                <span className='Form-label'>Indique la lista de los nombres y solicitantes de los miembros de la Junta Directiva y/o Comité Ejecutivo:</span>
                <SubsidiaryTable className='Table'/>
                <Notes notes={notes} />
                <TextInput label='Nombre:' className='Form-textInputBox Form-textInputBox--mediumInput'/>
                <TextInput label='Cargo:' className='Form-textInputBox Form-textInputBox--mediumInput'/>
                <DateInput className='' label='Fecha:' date={abbott10.get('date')} form={form} input='date'/>
                <TextInput label='Firma:' className='Form-textInputBox Form-textInputBox--mediumInput'/>
            </div>
        </form>
    </div>
);

export default Abbott10;