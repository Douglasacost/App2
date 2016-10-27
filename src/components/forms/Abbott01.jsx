import React, { Component } from 'react';
import Input from '../common/Input';

const Abbott01 = ({ Abbott01 }) => (
    <div className='Form MainScreen'>
        <form className='Form-container' action="#">
            <div className='Form-titleContainer'>
                <span className='Form-text Form-title'>CACMP-DR ABBOTT 001</span>
                <span className='Form-text Form-description'>SOLICITUD DE PATROCINIO</span>
            </div>
            <div className='Form-fieldSet'>
                <Input label='Nacional/Local:' className='Form-textInput'/>
                <Input label='Internacional:' className='Form-textInput'/>
                <Input label='Fecha de Solicitud:' className='Form-textInput'/>
            </div>
        </form>
    </div>
);

export default Abbott01;