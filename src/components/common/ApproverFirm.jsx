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
    handleOnClick(e){
        e.preventDefault();
        console.log('clicked');
        //set state
        const approveInput = this.props.approveInput,
              dateInput = this.props.dateInput,
              today = moment().toISOString();
        let dataJson = {};
        dataJson[approveInput] = 'si';
        dataJson[dateInput] = today;
        const dataMap = Map(dataJson);
        // let dataMap = Map({});
        // dataMap = dataMap.set(approveInput, )
        this.props.setFormData(this.props.form, dataMap);
    }
    render() {
        let { className, id, label, stringDate, form, dateInput, approveInput, user, aprobador, aprobado } = this.props;
        let defaultClasses = 'Firm-container ';
        let classes = defaultClasses.concat(className);
        let today = moment();
        let handleOnClick = this.handleOnClick.bind(this);
        return (
            <div className={classes}>
                <span className='Firm-label'>{label}</span>
                <span className='Firm-label'><u>{aprobador}</u></span>
                <DateInput className='' 
                    label='Fecha:' 
                    stringDate={today} 
                    input=''
                    form=''
                    disabled={true} />
                { (aprobado !== undefined && aprobado !== null) ?
                    <span className='Firm-approvedImages'>aprobado</span>
                    :
                    ( (aprobador === user) &&
                        <button className="mui-btn mui-btn--primary" id={id} onClick={handleOnClick}>Aprobar</button>
                    )
                }
            </div>
        );
    }
}

export default connect(null, { setField, setFormData })(ApproverFirm);