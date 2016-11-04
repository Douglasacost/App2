import React, { Component } from 'react';
import { List, ListItem } from 'react-mdl';

export default class Notes extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let { title, notes } = this.props;
        return (
            <div className='Note-container'>
                <span className='Note-title'>{title}</span>
                <List className='Note-list'>
                    {notes.map(function(note, i){
                            return <ListItem key={i}>{note.text}</ListItem>;
                        })}
                </List>
            </div>
        );
    }
}