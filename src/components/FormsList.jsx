import React, { Component } from 'react';
import { Link } from 'react-router';
import { List, ListItem, ListItemAction  } from 'react-mdl';

export default class FormsList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <List style={{width: '300px'}}>
                    <ListItem>
                        <ListItemAction>
                            <a href="#/abbott01">abbott01</a>
                        </ListItemAction>
                    </ListItem>
                    <ListItem>
                        <ListItemAction>
                            <a href="#"></a>
                        </ListItemAction>
                    </ListItem>
                    <ListItem>
                        <ListItemAction>
                            <a href="#"></a>
                        </ListItemAction>
                    </ListItem>
                </List>
            </div>
        );
    }
}