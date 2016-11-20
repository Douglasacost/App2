import React, { Component } from 'react';
import TextInput from '../common/TextInput';
import DateInput from '../common/DateInput';
import RadioInput from '../common/RadioInput';
import Firm from '../common/Firm';
import Notes from '../common/Notes';
import CheckboxInput from '../common/CheckboxInput';
import TextInputGroup from '../common/TextInputGroup';
import TextBoxInput from '../common/TextBoxInput';
import NumberInput from '../common/NumberInput';
import Dropdown from '../common/Dropdown';
import ApproverFirm from '../common/ApproverFirm';
import moment from 'moment';

var formApi = require('../../modules/FormApi');
var formApiInstance = new formApi();

let todayDate = moment();
const notes = {
        footNotes: [{text: 'Please note that consultant compensation must not be offered or given with the intent to induce, or in exchange for, an explicit agreement or understanding that Abbott products will be used, purchased, leased, ordered, prescribed, recommended, or arranged for or provided formulary or other preferential or qualified status.'}]
};
const form = 'abbott06';

export default class Abbott06 extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        var formId = this.props.params.id;
        if (formId){
            this.getDataFromList(formId);
        } else {
            formApiInstance.getDataList('/sites/forms/',
                'Approvers',
                form,
                'aprobadores',
                this.props.setField.bind(this)
            );
        }
    }
    getDataFromList(formId) {
        console.log('entered get');
        let keysNames = ['name','date','phone','email','division','nameHcp','hcpTier','amount', 'explain',
                         'signature', 'dateSignature', 'businessHead', 'dateBusinessHead', 'businessHeadApproved', 'finance', 'dateFinance', 'financeApproved', 'oecSignature',
                         'dateOec', 'oecApproved', 'estado'];
        let data = formApiInstance.getData('/sites/forms/',
            'Abbott06', 
            keysNames, 
            formId, 
            form, 
            this.props.setFormData.bind(this)
            );
    }
    handleSubmit(e){
        e.preventDefault();
        var formApiInstance = new formApi();
        let formState;
        const formId = this.props.params.id;
        if (formId && formId !== undefined && formId !== null && formId !== '' ){
            formState = this.props.abbott06;    
        } else {
            formState = this.props.abbott06.set('signature', this.props.user.get('displayName')).set('dateSignature', moment().toISOString()).set('estado', 'Pendiente');
        }
        formApiInstance.postData('/sites/forms',
            'Abbott06',
            'Abbott06',
            formState,
            this.props.params.id
        );
    }
    render() {
        let { abbott06, user } = this.props;
        return (
            <div className='Form MainScreen'>
                <form className='Form-container Abbott06' action="#">
                    <div className='Form-titleContainer'>
                        <span className='Form-text Form-title'>International Fair Market Value (FMV) Exception Form</span>
                        <span className='Form-text Form-state'>Estado: {abbott06.get('estado')}</span>
                        <span className='Form-text Form-description'>*This form should be used only after first consulting the FMV Tool.</span>
                    </div>
                    <div className='Form-fieldSet'>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Requestor Information</th>
                                </tr>
                                <tr>
                                    <td><TextInput label='Name / Title:' value={abbott06.get('name')} id='name' form={form} className='Form-textInputBox'/></td>
                                    <td><DateInput className='' label='Date:' stringDate={abbott06.get('date')} form={form} input='date'/></td>
                                </tr>
                                <tr>
                                    <td><NumberInput label='Phone Number:' id='phone' value={abbott06.get('phone')} className='Form-textInputBox' form={form}/></td>
                                    <td><TextInput label='Manager:' value={abbott06.get('manager')} id='manager' form={form} className='Form-textInputBox'/></td>
                                </tr>
                                <tr><td><TextInput label='Email:' value={abbott06.get('email')} id='email' form={form} className='Form-textInputBox'/></td>
                                    <td><TextInput label='Division / Department:' value={abbott06.get('division')} id='division' form={form} className='Form-textInputBox'/></td>
                                </tr>
                                <tr><td><TextInput label='Name of HCP/Customer:' value={abbott06.get('nameHcp')} id='nameHcp' form={form} className='Form-textInputBox'/></td>
                                    <td><TextInput label='HCP Tier:' value={abbott06.get('hcpTier')} id='hcpTier' form={form} className='Form-textInputBox'/></td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className='Form-label'>Please answer the following questions:</span>
                                        <span className='Form-label'>1. What is the proposed FMV compensation for this HCP/Customer (“HCP”)? $</span>
                                        <NumberInput label='Amount:' id='amount' value={abbott06.get('amount')} className='Form-textInputBox' form={form}/>
                                        <span className='Form-label'>2. Please explain why the proposed compensation is consistent with fair market value, focusing on factors such as the HCP’s unique qualifications and experience, the nature of the services to be provided, theHCP’s particular specialty or area of expertise, and any other relevant information to consider.</span>
                                        <TextBoxInput rows='2' id='explain' value={abbott06.get('explain')} form={form}/>
                                        <span className='Form-label'>3. Please submit this request form and the following items to OEC:</span>
                                        <ul>
                                            <li>* The printout of the FMV Tool worksheet</li>
                                            <li>* A copy of the HCP’s CV</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td><Firm label='HCP Tier:' user={user.get('displayName')} solicitante={abbott06.get('signature')} stringDate={abbott06.get('dateSignature')} form={form} input='dateSignature' /></td>
                                </tr>
                                <tr><th>Approvals (per local policy):</th></tr>
                                <tr>
                                    <td>
                                        { (this.props.params.id) ?
                                            <ApproverFirm label='Business Head Signature:' aprobador={abbott06.get('businessHead')} aprobado={abbott06.get('businessHeadApproved')} stringDate={abbott06.get('dateBusinessHead')} form={form} dateInput='dateBusinessHead' approveInput='businessHeadApproved' user={user.get('displayName')} />
                                            :
                                            <Dropdown options={abbott06.get('aprobadores')} label='Select Business Head Signature' selected={abbott06.get('businessHead')} input='businessHead' form={form} />
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        { (this.props.params.id) ?
                                            <ApproverFirm label='Finance Signature:' aprobador={abbott06.get('finance')} aprobado={abbott06.get('financeApproved')} stringDate={abbott06.get('dateFinance')} form={form} dateInput='dateFinance' approveInput='financeApproved' user={user.get('displayName')} />
                                            :
                                            <Dropdown options={abbott06.get('aprobadores')} label='Select Finance Signature' selected={abbott06.get('finance')} input='finance' form={form} />
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        { (this.props.params.id) ?
                                            <ApproverFirm label='OEC Signature:' aprobador={abbott06.get('oecSignature')} aprobado={abbott06.get('oecApproved')} stringDate={abbott06.get('dateOec')} form={form} dateInput='dateOec' approveInput='oecApproved' user={user.get('displayName')} />
                                            :
                                            <Dropdown options={abbott06.get('aprobadores')} label='Select OEC Signature' selected={abbott06.get('oecSignature')} input='oecSignature' form={form} />
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    { (abbott06.get('estado') !== 'Aprobado' && abbott06.get('estado') !== 'Rechazado' ) &&
                                        <button className="mui-btn mui-btn--primary" onClick={this.handleSubmit.bind(this)}>Enviar</button>
                                    }
                                </tr>
                            </tbody>
                        </table>
                        <Notes notes={notes.footNotes} />
                    </div>
                </form>
            </div>
        );
    }
}