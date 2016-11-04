import React, { Component } from 'react';
import TextInput from '../common/TextInput';

export default class TextInputGroup extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let { label, fields } = this.props;
        let options = [];
        switch(fields) {
            case 'HCP':
                options = HCPInputs;
                break;
            case 'Applicant':
                options = Applicant;
                break;
            case 'Goverment':
                options = Goverment;
                break;
        }
        console.log(options);
        return (
            <div>
                <span>{label}</span>
                { (options) && 
                    options.map(function(option, i){
                            return <TextInput label={option.label} id={option.id} key={i} className='Form-textInputBox'/>;
                        })
                }
            </div>
        );
    }
}

const HCPInputs = [
    {
        label: 'Nombre del HCP:'
    },
    {
        label: 'Especialidad del HCP:'
    },
    {
        label: 'Especialidad del HCP:'
    }
]

const Applicant = [
    {
        label: 'Nombre del solicitate:'
    },
    {
        label: 'Unidad de Negocio:'
    }
]

const Goverment = [
    {
        label: 'Nombre de la Institución/Hospital:'
    },
    {
        label: 'Puesto/Rol en el Gobierno:'
    }
]