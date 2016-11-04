import React, { Component } from 'react';
import { List, ListItem, ListItemAction  } from 'react-mdl';

const formLinks = [
    'abbott01',
    'abbott02',
    'abbott04',
    'abbott05',
    'abbott06',
    'abbott10',
    'abbott11',
    'abbottExcepcionCompra',
    'AbbottObjetivosActividad'
]

export default class FormsList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <List style={{width: '300px'}}>
                        {formLinks.map(function(form, i){
                            let href = '#/' + form
                            return (
                                <ListItem key={i}>
                                    <ListItemAction>
                                        <a href={href}>{form}</a>
                                    </ListItemAction>
                                </ListItem>
                            );
                        })}
                </List>
            </div>
        );
    }
}