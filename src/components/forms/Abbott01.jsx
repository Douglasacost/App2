import React, { Component } from 'react';
import TextInput from '../common/TextInput';
import DateInput from '../common/DateInput';
import RadioInput from '../common/RadioInput';

const Abbott01 = ({ Abbott01 }) => (
    <div className='Form MainScreen'>
        <form className='Form-container' action="#">
            <div className='Form-titleContainer'>
                <span className='Form-text Form-title'>CACMP-DR ABBOTT 001</span>
                <span className='Form-text Form-description'>SOLICITUD DE PATROCINIO</span>
            </div>
            <div className='Form-fieldSet'>
                <TextInput label='Nacional/Local:' className='Form-textInput'/>
                <TextInput label='Internacional:' className='Form-textInput'/>
                <DateInput className='Form-dateInput' label='Fecha de Solicitud:' />
                <TextInput label='Nombre del solicitate:' className='Form-textInput'/>
                <TextInput label='Unidad de Negocio:' className='Form-textInput'/>
                <TextInput label='Nombre del HCP:' className='Form-textInput'/>
                <TextInput label='Especialidad del HCP:' className='Form-textInput'/>
                <TextInput label='País de Recidencia:' className='Form-textInput'/>
                <RadioInput label='El HCP es empleado del Gobierno?' name='gobierno'/>
            </div>
        </form>
    </div>
);

export default Abbott01;