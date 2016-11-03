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
import { Checkbox } from 'react-mdl';
import moment from 'moment';

let todayDate = moment();
const booleanOption = [ 'si', 'no'];
const impactOptiones = [ 'Hospital', 'Regional', 'Nacional'];
const notes = {
        footNotes: [{text: 'Please note that consultant compensation must not be offered or given with the intent to induce, or in exchange for, an explicit agreement or understanding that Abbott products will be used, purchased, leased, ordered, prescribed, recommended, or arranged for or provided formulary or other preferential or qualified status.'}]
};
const form = 'abbott06';

const Abbott06 = ({ abbott06 }) => (
    <div className='Form MainScreen'>
        <form className='Form-container Abbot01' action="#">
            <div className='Form-titleContainer'>
                <span className='Form-text Form-title'>International Fair Market Value (FMV) Exception Form</span>
                <span className='Form-text Form-description'>*This form should be used only after first consulting the FMV Tool.</span>
            </div>
            <div className='Form-fieldSet'>
                <table>
                    <tbody>
                        <tr>
                            <th>Requestor Information</th>
                        </tr>
                        <tr>
                            <td><TextInput label='Name / Title:' className='Form-textInputBox'/></td>
                            <td><DateInput className='' label='Date:' date={abbott06.get('date')} form={form} input='date'/></td>
                        </tr>
                        <tr>
                            <td><NumberInput label='Phone Number:' className='Form-textInputBox'/></td>
                            <td><TextInput label='Manager:' className='Form-textInputBox'/></td>
                        </tr>
                        <tr>
                            <td><TextInput label='Email:' className='Form-textInputBox'/></td>
                            <td><TextInput label='Division / Department:' className='Form-textInputBox'/></td>
                        </tr>
                        <tr>
                            <td><TextInput label='Name of HCP/Customer:' className='Form-textInputBox'/></td>
                            <td><TextInput label='HCP Tier:' className='Form-textInputBox'/></td>
                        </tr>
                        <tr>
                            <td>
                                <span className='Form-label'>Please answer the following questions:</span>
                                <span className='Form-label'>1. What is the proposed FMV compensation for this HCP/Customer (“HCP”)? $</span>
                                <NumberInput label='Amount:' className='Form-textInputBox'/>
                                <span className='Form-label'>2. Please explain why the proposed compensation is consistent with fair market value, focusing on factors such as the HCP’s unique qualifications and experience, the nature of the services to be provided, theHCP’s particular specialty or area of expertise, and any other relevant information to consider.</span>
                                <TextBoxInput rows='2' />
                                <span className='Form-label'>3. Please submit this request form and the following items to OEC:</span>
                                <ul>
                                    <li>* The printout of the FMV Tool worksheet</li>
                                    <li>* A copy of the HCP’s CV</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td><TextInput label='Signature of Requestor' className='Form-textInputBox'/></td>
                        </tr>
                        <tr><th>Approvals (per local policy):</th></tr>
                        <tr>
                            <td><Firm label='Business Head Signature' date={todayDate} /></td>
                        </tr>
                        <tr>
                            <td><Firm label='Finance Signature' date={todayDate} /></td>
                        </tr>
                        <tr>
                            <td><Firm label='OEC Signature' date={todayDate} /></td>
                        </tr>
                    </tbody>
                </table>
                <Notes notes={notes.footNotes} />
            </div>
        </form>
    </div>
);

export default Abbott06;