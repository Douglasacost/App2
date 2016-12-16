import React, { Component } from 'react';
import { List, ListItem } from 'react-mdl';

export default class Notes extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let { title, notes, className } = this.props;
        let classes = 'Note-container ';
        if (className) {
            classes = classes.concat(className);
        }
        return (
            <div className={classes} >
                <span className='Note-title'>{title}</span>
                <ul className='Note-list'>
                    {notes.map(function(note, i){
                            return <li key={i}>{note.text}</li>;
                        })}
                </ul>
            </div>
        );
    }
}