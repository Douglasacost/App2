import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, fromJS, List } from 'immutable';
import DateInput from './DateInput';
import moment from 'moment';
import { setField, setFormData } from '../../actions/Actions';
import TextInput from '../common/TextInput';

class ApproverFirm extends Component {
    constructor(props) {
        super(props);
    }
    handleClick(selected){
        //set state
        const approveInput = this.props.approveInput,
              dateInput = this.props.dateInput,
              today = moment().toISOString();
        let dataJson = {};
        dataJson[approveInput] = selected;
        dataJson[dateInput] = today;
        const dataMap = Map(dataJson);
        this.props.setFormData(this.props.form, dataMap);
    }
    render() {
        let { className, id, label, stringDate, form, dateInput, approveInput, user, aprobador, aprobado, flagGerente, state } = this.props;
        let defaultClasses = 'Firm-container Firm ';
        let classes = defaultClasses.concat(className);
        let today = moment();
        let handleApprove = this.handleClick.bind(this, 'si');
        let handleReject = this.handleClick.bind(this, 'no');
        let disabled = (state.get('estado') === 'Rechazado') ? true : false ;
        if(flagGerente !== undefined && flagGerente !== null){
            return (
                <div className={classes}>
                    <div className='Firm-top'>
                        <span className='Firm-label'>{label}</span>
                        <span className='Firm-label'><u>{aprobador}</u></span>
                    </div>
                    <div className='Firm-bottom' >
                        <DateInput className='' 
                            label='Fecha:' 
                            stringDate={(stringDate !== undefined && stringDate !== null && stringDate !== '') ? moment(stringDate) : today } 
                            input=''
                            form=''
                            disabled={true} />
                        {(stringDate !== undefined && stringDate !== null && stringDate !== '') && <span className='Firm-time'>Hora: {moment(stringDate).format("hh:mm:ss a")}</span> }
                        { (aprobado !== undefined && aprobado !== null && aprobado!== '') ?
                            ( (aprobado === 'si') ?
                                <span className='Firm-approvedImages'>Aprobado</span>
                                :
                                <span>
                                    <span className='Firm-approvedImages'>Rechazado</span>
                                    <TextInput label='Comentario del rechazo:' value={state.get('comentarioRechazo')} id='comentarioRechazo' form={form} className='Form-textInputBox' disabled={disabled}/>
                                </span>
                            )
                            :
                            ( (flagGerente) &&
                                <div className='mui-container'>
                                    <button className="mui-btn mui-btn--primary" onClick={handleApprove}>Aprobar</button>
                                    <button className="mui-btn mui-btn--primary" onClick={handleReject}>Rechazar</button>
                                </div>
                            )
                        }
                    </div>
                </div>
            );
        }
        return (
            <div className={classes}>
                <div className='Firm-top'>
                    <span className='Firm-label'>{label}</span>
                    <span className='Firm-label'><u>{aprobador}</u></span>
                </div>
                <div className='Firm-bottom' >
                    <DateInput className='' 
                        label='Fecha:' 
                        stringDate={(stringDate !== undefined && stringDate !== null && stringDate !== '') ? moment(stringDate) : today } 
                        input=''
                        form=''
                        disabled={true} />
                    {(stringDate !== undefined && stringDate !== null && stringDate !== '') && <span className='Firm-time'>Hora: {moment(stringDate).format("hh:mm:ss a")}</span> }
                    { (aprobado !== undefined && aprobado !== null && aprobado!== '') ?
                        ( (aprobado === 'si') ?
                            <span className='Firm-approvedImages'>Aprobado</span>
                            :
                            <span>
                                <span className='Firm-approvedImages'>Rechazado</span>
                                <TextInput label='Comentario del rechazo:' value={state.get('comentarioRechazo')} id='comentarioRechazo' form={form} className='Form-textInputBox' disabled={disabled}/>
                            </span>
                        )
                        :
                        ( (aprobador === user) &&
                            <div className='mui-container'>
                                <button className="mui-btn mui-btn--primary" onClick={handleApprove}>Aprobar</button>
                                <button className="mui-btn mui-btn--primary" onClick={handleReject}>Rechazar</button>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default connect(null, { setField, setFormData })(ApproverFirm);