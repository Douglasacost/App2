import React, { Component } from 'react';
import Dropdown from '../common/Dropdown';

export default class metadataFields extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { form, disabled, state } = this.props;
        return (
            <div className='MetadataFields-container'>
                <Dropdown options={state.get('paises')} label='Seleccione País' selected={state.get('paisProceso')} input='paisProceso' form={form} />
                <Dropdown options={state.get('divisiones')} label='Seleccione Divisíon' selected={state.get('divisionProceso')} input='divisionProceso' form={form} />
                <Dropdown options={state.get('productos')} label='Seleccione Producto' selected={state.get('productoProceso')} input='productoProceso' form={form} />
            </div>
        );
    }
}