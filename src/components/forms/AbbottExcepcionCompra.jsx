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
const orderType = [ 'Orden de compra emitida después del evento:', 'Proveedor único (no cotizaciones adicionales):'];
const notes = {
        footNotes: [{text: '(Requerida para Ordenes de Compra emitidas después del evento).'}],
};

const AbbottExcepcionCompra = ({ abbottExcepcionCompra }) => (
    <div className='Form MainScreen'>
        <form className='Form-container AbbottExcepcionCompra' action="#">
            <div className='Form-titleContainer'>
                <span className='Form-text Form-title'>CFR CACM-P-RD</span>
                <span className='Form-text Form-description'>Solicitud de excepción en compra</span>
            </div>
            <div className='Form-fieldSet'>
                <span className='Form-label'>Nota: Adjuntar este documento a la orden de compra para la aprobación de finanzas.</span>
                <span className='Form-label'>Por este medio solicito autorización para la siguiente excepción en compras:</span>
                <CheckboxInput 
                    className='Checkbox-container--twoOption'
                    label='Marcar una de las dos op.:'
                    options={orderType}/>
                <DateInput className='' label='Fecha:' date={abbottExcepcionCompra.get('date')}/>
                <NumberInput label='Orden de Compra:' className='Form-textInputBox'/>
                <TextInput label='Nombre del Proveedor' className='Form-textInputBox'/>
                <TextInput label='Bienes o Servicios solicitados:' className='Form-textInputBox'/>
                <NumberInput label='Monto:' className='Form-textInputBox'/>
                <TextInput label='Moneda:' className='Form-textInputBox'/>
                <span className='Form-label'>Razón de la excepción:</span>
                <TextBoxInput rows='4' />
                <Firm label='Firma del Budgetary solicitante:' date={todayDate} />
                <Firm label='Firma del jefe inmediato:' date={todayDate} />
                <Firm label='Firma del Director o Gerente General del área:' date={todayDate} />
                <Notes notes={notes.footNotes} />
            </div>
        </form>
    </div>
);

export default AbbottExcepcionCompra;