import React, { Component } from 'react';
import { List, ListItem, ListItemAction  } from 'react-mdl';

const formLinks = [
    {name: 'CACMP-DR ABBOTT 01 Solicitud de Patrocinio', route: 'abbott01'},
    {name: 'CACMP-DR ABBOTT 02 Diligencia Debida HCP Oficiales de Gobierno y Tomadores de Decisiones', route: 'abbott02'},
    {name: 'CACMP-DR ABBOTT 04 Racional del Evento.', route: 'abbott04'},
    {name: 'CACMP-DR ABBOTT 05 Racional de Servicios Profesionales a Contratar', route: 'abbott05'},
    {name: 'CACMP-DR ABBOTT 06.1 International FMV Exception Form_FINAL protected', route: 'abbott06'},
    {name: 'CACMP-DR ABBOTT 10 Solicitud de Subvenciones Educativas, Becas y Donaciones a completar por el Beneficiario', route: 'abbott10'},
    {name: 'CACMP-DR ABBOTT 10.1 Solicitud de Becas y Donaciones a completar por Abbott', route: 'abbott10-1'},
    {name: 'CACMP-DR ABBOTT 11 Solicitud de Excepción', route: 'abbott11'},
    {name: 'Excepción de Compras - CFR', route: 'abbottExcepcionCompra'},
    {name: 'CACMP-DR ABBOTT Objetivos Actividades Actualizada Junio 2016', route: 'AbbottObjetivosActividad'},
    {name: 'CACMP-DR ABBOTT  Reporte de Viaticos  Gastos General Finanzas_2016', route: 'AbbottExpensesReport'}
]

export default class FormsList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <List style={{width: '500px'}}>
                        {formLinks.map(function(form, i){
                            let href = '#/' + form.route
                            return (
                                <ListItem key={i}>
                                    <ListItemAction>
                                        <a href={href}>{form.name}</a>
                                    </ListItemAction>
                                </ListItem>
                            );
                        })}
                </List>
            </div>
        );
    }
}