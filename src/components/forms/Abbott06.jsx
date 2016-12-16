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
import MetadataFields from '../common/MetadataFields';
import moment from 'moment';

var formApi = require('../../modules/FormApi');
var formApiInstance = new formApi();

var verifyRequired = require('../../modules/RequiredFields');
var verifyRequiredInstance = new verifyRequired();

const sharepointUrl = _spPageContextInfo.webAbsoluteUrl;
let todayDate = moment();
const notes = {
        footNotes: [{text: 'Please note that consultant compensation must not be offered or given with the intent to induce, or in exchange for, an explicit agreement or understanding that Abbott products will be used, purchased, leased, ordered, prescribed, recommended, or arranged for or provided formulary or other preferential or qualified status.'}]
};
const form = 'abbott06';
const fieldsToVerify = ['businessHead', 'finance', 'oecSignature'];

export default class formState extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        var formId = this.props.params.id;
        if (formId){
            this.getDataFromList(formId);
        } else {
            formApiInstance.getDataList(sharepointUrl,
                'Approvers',
                form,
                'aprobadores',
                this.props.setField.bind(this)
            );
            formApiInstance.getDataList(sharepointUrl,
                'Paises',
                form,
                'paises',
                this.props.setField.bind(this)
            );
            formApiInstance.getDataList(sharepointUrl,
                'Producto',
                form,
                'productos',
                this.props.setField.bind(this)
            );
            formApiInstance.getDataList(sharepointUrl,
                'Divisiones',
                form,
                'divisiones',
                this.props.setField.bind(this)
            );
        }
    }
    getDataFromList(formId) {
        console.log('entered get');
        // disable inputs when getting data because they are no longer editable
        let fielsetEl = document.getElementById('fieldset-to-disable');
        fielsetEl.disabled = true;
        let keysNames = ['name','date','phone','email','division','nameHcp','hcpTier','amount', 'explain',
                         'signature', 'dateSignature', 'businessHead', 'dateBusinessHead', 'businessHeadApproved', 'finance', 'dateFinance', 'financeApproved', 'oecSignature',
                         'dateOec', 'oecApproved', 'estado', 'comentarioRechazo', 'paisProceso', 'divisionProceso', 'productoProceso'];
        let data = formApiInstance.getData(sharepointUrl,
            'Abbott06', 
            keysNames, 
            formId, 
            form, 
            this.props.setFormData.bind(this)
            );
    }
    handlePost(){
        var formApiInstance = new formApi();
        let formState;
        const formId = this.props.params.id;
        if (formId && formId !== undefined && formId !== null && formId !== '' ){
            formState = this.props.formState;    
        } else {
            formState = this.props.formState.set('signature', this.props.user.get('displayName')).set('dateSignature', moment().toISOString()).set('estado', 'Pendiente').set('date', moment().toISOString());
        }
        formState = formState.delete('paises').delete('divisiones').delete('productos');
        formApiInstance.postData(sharepointUrl,
            'Abbott06',
            'Abbott06',
            formState,
            this.props.params.id
        );
    }
    handleSubmit(e){
        e.preventDefault();
        verifyRequiredInstance.verify(fieldsToVerify,this.props.formState, this.handlePost.bind(this));
    }
    handlePrint(e){
        e.preventDefault();
        window.focus();
        window.print();
    }
    render() {
        let { formState, user } = this.props;
        let fecha = formState.get('date');
        let estadoActual = formState.get('estado');
        let disableInputs = (estadoActual !== '' && estadoActual !== undefined && estadoActual !== null) ? true : false ;
        let today = moment();
        return (
            <div className='Form MainScreen'>
                <form className='Form-container Abbott06' action="#">
                    <div className='Form-titleContainer'>
                        <span className='Form-text Form-title'>International Fair Market Value (FMV) Exception Form</span>
                        <span className='Form-text Form-state'>Estado: {formState.get('estado')}</span>
                        <span className='Form-text Form-state'>Id: {this.props.params.id}</span>
                        <span className='Form-text Form-description'>*This form should be used only after first consulting the FMV Tool.</span>
                    </div>
                    <fieldset className='Form-fieldSet' id='fieldset-to-disable'>
                        <MetadataFields state={formState} form={form} disabled={disableInputs}/>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Requestor Information</th>
                                </tr>
                                <tr>
                                    <td><TextInput label='Name / Title:' value={formState.get('name')} id='name' form={form} className='Form-textInputBox'/></td>
                                    <td><DateInput className='' label='Date:' stringDate={(fecha !== undefined && fecha !== null && fecha !== '') ? moment(fecha) : today } form={form} input='date' disabled={true}/></td>
                                </tr>
                                <tr>
                                    <td><NumberInput label='Phone Number:' id='phone' value={formState.get('phone')} className='Form-textInputBox' form={form}/></td>
                                    <td><TextInput label='Manager:' value={formState.get('manager')} id='manager' form={form} className='Form-textInputBox'/></td>
                                </tr>
                                <tr><td><TextInput label='Email:' value={formState.get('email')} id='email' form={form} className='Form-textInputBox'/></td>
                                    <td><TextInput label='Division / Department:' value={formState.get('division')} id='division' form={form} className='Form-textInputBox'/></td>
                                </tr>
                                <tr><td><TextInput label='Name of HCP/Customer:' value={formState.get('nameHcp')} id='nameHcp' form={form} className='Form-textInputBox'/></td>
                                    <td><TextInput label='HCP Tier:' value={formState.get('hcpTier')} id='hcpTier' form={form} className='Form-textInputBox'/></td>
                                </tr>
                            </tbody>
                        </table>
                        <span className='Form-spacer'></span>
                        <span className='Form-label'>Please answer the following questions:</span>
                        <span className='Form-spacer'></span>
                        <span className='Form-label'>1. What is the proposed FMV compensation for this HCP/Customer (“HCP”)? $</span>
                        <NumberInput label='Amount:' id='amount' value={formState.get('amount')} className='Form-textInputBox Print-smallTextInput' form={form}/>
                        <span className='Form-spacer'></span>
                        <span className='Form-label'>2. Please explain why the proposed compensation is consistent with fair market value, focusing on factors such as the HCP’s unique qualifications and experience, the nature of the services to be provided, theHCP’s particular specialty or area of expertise, and any other relevant information to consider.</span>
                        <TextBoxInput rows='2' id='explain' value={formState.get('explain')} form={form}/>
                        <span className='Form-label'>3. Please submit this request form and the following items to OEC:</span>
                        <ul>
                            <li>* The printout of the FMV Tool worksheet</li>
                            <li>* A copy of the HCP’s CV</li>
                        </ul>
                    </fieldset>
                    <fieldset className='Form-fieldSet'>
                        <Firm label='Signature of Requestor:' fechaLabel='Date:' user={user.get('displayName')} solicitante={formState.get('solicitante')} stringDate={formState.get('fechaFirmaDelSolicitante')} form={form} input='fechaFirmaDelSolicitante' />
                        <span className='Form-label'>Approvals (per local policy):</span>
                        { (this.props.params.id) ?
                            <ApproverFirm label='Business Head Signature:' aprobador={formState.get('businessHead')} aprobado={formState.get('businessHeadApproved')} stringDate={formState.get('dateBusinessHead')} form={form} dateInput='dateBusinessHead' approveInput='businessHeadApproved' user={user.get('displayName')} state={formState}/>
                            :
                            <Dropdown options={formState.get('aprobadores')} label='Select Business Head Signature' selected={formState.get('businessHead')} input='businessHead' form={form} />
                        }
                        { (this.props.params.id) ?
                            <ApproverFirm label='Finance Signature:' aprobador={formState.get('finance')} aprobado={formState.get('financeApproved')} stringDate={formState.get('dateFinance')} form={form} dateInput='dateFinance' approveInput='financeApproved' user={user.get('displayName')} state={formState}/>
                            :
                            <Dropdown options={formState.get('aprobadores')} label='Select Finance Signature' selected={formState.get('finance')} input='finance' form={form} />
                        }
                        { (this.props.params.id) ?
                            <ApproverFirm label='OEC Signature:' aprobador={formState.get('oecSignature')} aprobado={formState.get('oecApproved')} stringDate={formState.get('dateOec')} form={form} dateInput='dateOec' approveInput='oecApproved' user={user.get('displayName')} state={formState}/>
                            :
                            <Dropdown options={formState.get('aprobadores')} label='Select OEC Signature' selected={formState.get('oecSignature')} input='oecSignature' form={form} />
                        }
                        { (formState.get('estado') !== 'Aprobado' && formState.get('estado') !== 'Rechazado' ) ?
                            <button className="mui-btn mui-btn--primary" onClick={this.handleSubmit.bind(this)}>Enviar</button>
                            :
                            <button className="mui-btn mui-btn--primary printButton" onClick={this.handlePrint.bind(this)}>Imprimir</button>
                        }
                        <Notes notes={notes.footNotes} />
                    </fieldset>
                </form>
            </div>
        );
    }
}