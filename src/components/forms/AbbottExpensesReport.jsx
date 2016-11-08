import React, { Component } from 'react';
import TextInput from '../common/TextInput';
import TextBoxInput from '../common/TextBoxInput';
import DateInput from '../common/DateInput';
import Firm from '../common/Firm';
import Notes from '../common/Notes';
import TextInputGroup from '../common/TextInputGroup';
import ExpensesTable from '../common/ExpensesTable';
import Dropdown from 'react-dropdown';
import moment from 'moment';

let todayDate = moment();
const notes = [
        {
            text: 'Damos fe que todos los documentos que soportan este reporte de gastos fueron ejecutados en el ejercicio de las funciones asignadas.'
        }];
const expenseType = [
  'Reintegro', 'Anticipo', 'Liquidación Anticipo'
]
const form = 'abbottExpensesReport';

const AbbottExpensesReport = ({ abbottExpensesReport }) => (
    <div className='Form MainScreen'>
        <form className='Form-container AbbottExpensesReport' action="#">
            <div className='Form-titleContainer'>
                <span className='Form-text Form-title'>Img</span>
            </div>
            <div className='Form-fieldSet'>
                <DateInput className='' label='Fecha Solicitud:' date={abbottExpensesReport.get('date')} form={form} input='date'/>
                <TextInput label='Nombre del Solicitante:' className='Form-textInputBox'/>
                <TextInput label='Puesto' className='Form-textInputBox'/>
                <TextInput label='Pais - Presupuesto' className='Form-textInputBox'/>
                <span className='Divider-blue'></span>
                <span className='Form-label Form-label--leftAlign'>Descripcion del gasto (Motivo del gasto):</span>
                <TextBoxInput rows='4' className='Form-textAreaBox--rightAlign' />
                <ExpensesTable className='Table' form={form} date={abbottExpensesReport.get('date')} />
                <span className='Form-label Form-label--leftAlign'>TOTAL EN LETRAS:</span>
                <TextBoxInput rows='1' className='Form-textAreaBox--rightAlign' />
                <TextInput label='Firma de Titular' className='Form-firmInput'/>
                <TextInput label='Firma de Autoricacion (Jefatura Inmediata)' className='Form-firmInput'/>
                <Notes notes={notes} className='Note-container--blueBG' />
                <TextInput label='HACER TRANSFERENCIA A NOMBRE:' className='Form-textInputBox'/>
                <TextInput label='CUENTA BANCARIA:' className='Form-textInputBox'/>
            </div>
        </form>
    </div>
);

export default AbbottExpensesReport;