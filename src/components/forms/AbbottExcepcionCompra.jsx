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
const orderType = [ 'Orden de compra emitida después del evento', 'Proveedor único (no cotizaciones adicionales)'];
const notes = {
        footNotes: [{text: '(Requerida para Ordenes de Compra emitidas después del evento).'}],
};

const form = 'abbottExcepcionCompra';

export default class ActivityPeopleTable extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let { abbottExcepcionCompra } = this.props;
        return (
            <div className='Form MainScreen'>
                <form className='Form-container AbbottExcepcionCompra'
                    onSubmit={(e) => { 
                        e.preventDefault();
                        let content = abbottExcepcionCompra.toJS();
                        console.log(content);
                    }} >
                    <div className='Form-titleContainer'>
                        <span className='Form-text Form-title'>CFR CACM-P-RD</span>
                        <span className='Form-text Form-description'>Solicitud de excepción en compra</span>
                    </div>
                    <div className='Form-fieldSet'>
                        <span className='Form-label'>Nota: Adjuntar este documento a la orden de compra para la aprobación de finanzas.</span>
                        <span className='Form-label'>Por este medio solicito autorización para la siguiente excepción en compras:</span>
                        <RadioInput 
                            label='Marcar una de las dos op.:' 
                            name='tipoDeOrden'
                            selected='Orden de compra emitida después del evento'
                            options={orderType}/>
                        <DateInput className='' label='Fecha:' date={abbottExcepcionCompra.get('fecha')} form={form} input='fecha' />
                        <NumberInput label='Orden de Compra:' id='ordenDeCompra' className='Form-textInputBox'/>
                        <TextInput label='Nombre del Proveedor' value={abbottExcepcionCompra.get('proveedor')} id='proveedor' className='Form-textInputBox'/>
                        <TextInput label='Bienes o Servicios solicitados:' id='bienesOServiciosSolicitado' value={abbottExcepcionCompra.get('bienesOServiciosSolicitado')} className='Form-textInputBox'/>
                        <NumberInput label='Monto:' id='monto' value={abbottExcepcionCompra.get('monto')} className='Form-textInputBox'/>
                        <TextInput label='Moneda:' id='moneda' value={abbottExcepcionCompra.get('moneda')} className='Form-textInputBox'/>
                        <span className='Form-label'>Razón de la excepción:</span>
                        <TextBoxInput rows='4' id='razonDeExcepcion' value={abbottExcepcionCompra.get('razonDeExcepcion')} />
                        <Firm label='Firma del Budgetary solicitante:' date={abbottExcepcionCompra.get('fechaFirmaSolicitante')} form={form} input='fechaFirmaSolicitante' />
                        <Firm label='Firma del jefe inmediato:' date={abbottExcepcionCompra.get('fechaFirmaJefeInmediato')} form={form} input='fechaFirmaJefeInmediato' />
                        <Firm label='Firma del Director o Gerente General del área:' date={abbottExcepcionCompra.get('fechaFirmaGerente')} form={form} input='fechaFirmaGerente' />
                        <Notes notes={notes.footNotes} />
                        <input type="submit" value="Submit"></input >
                    </div>
                </form>
            </div>
        );
    }
}