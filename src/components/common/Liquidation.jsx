import React, { Component } from 'react';
import { Textfield } from 'react-mdl';
import { connect } from 'react-redux';
import { setField } from '../../actions/Actions';

class Liquidation extends Component {
    constructor(props) {
        super(props);
    }
    handleChange(e){
        let value = e.currentTarget.value,
            form = this.props.form,
            input = e.currentTarget.name;
        console.log(e.currentTarget);
        this.props.setField(form, input, value);
    }
    netVal(value){
        let number = parseInt(value);
        let processed = (isNaN(number)) ? 0 : number;
        return processed ;
    }
    render() {
        let { className, form, state } = this.props;
        let totalValue = this.netVal(state.get('anticipo')) - this.netVal(state.get('gastos')) - this.netVal(state.get('depositos'));
        let handleChange = this.handleChange.bind(this);
        let estadoActual = state.get('estado');
        let disableInputs = (estadoActual !== '' && estadoActual !== undefined && estadoActual !== null) ? true : false ;
        return (
            <div className={className}>
                <table>
                    <tbody>
                        <tr>
                            <th colSpan="2" scope="colgroup">LIQUIDACION - RESUMEN</th>
                        </tr>
                        <tr>
                            <td>Anticipo Otorgado</td>
                            <td><input type="text" name='anticipo'
                                        value={state.get('anticipo')}
                                        onChange={handleChange} disabled={disableInputs}/>
                            </td>
                        </tr>
                        <tr>
                            <td>(-)Total de Gasto</td>
                            <td><input type="text" name='gastos'
                                        value={state.get('gastos')}
                                        onChange={handleChange} disabled={disableInputs}/>
                            </td>
                        </tr>
                        <tr>
                            <td>(-)Total de Depósitos</td>
                            <td><input type="text" name='depositos'
                                        value={state.get('depositos')}
                                        onChange={handleChange} disabled={disableInputs}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td><Textfield
                                    onChange={() =>{}}
                                    label=''
                                    id=''
                                    name=''
                                    value={(totalValue === 0) ? '' : totalValue}
                                    floatingLabel
                                    disabled={disableInputs}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(null, { setField })(Liquidation);