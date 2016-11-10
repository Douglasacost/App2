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
        label: 'Nombre del HCP:',
        id: 'nombrehcp'
    },
    {
        label: 'Especialidad del HCP:',
        id: 'especialidadhcp'
    },
    {
        label: 'País de Residencia:',
        id: 'paisderesidencia'
    }
]

const Applicant = [
    {
        label: 'Nombre del solicitante:',
        id: 'nombresolicitante'
    },
    {
        label: 'Unidad de Negocio:',
        id: 'unidaddenegocio'
    }
]

const Goverment = [
    {
        label: 'Nombre de la Institución/Hospital:',
        id: 'Institución'
    },
    {
        label: 'Puesto/Rol en el Gobierno:',
        id: 'rolgobierno'
    }
]