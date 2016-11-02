import React, { Component } from 'react';
import { List, ListItem } from 'react-mdl';
const cx = require('classnames');

export default class Notes extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let { className, id, label, title, notes } = this.props;
        return (
            <div>
                <span className={cx('Note-title', {className})}>{title}</span>
                <List>
                    {notes.map(function(note, i){
                            return <ListItem key={i}>{note.text}</ListItem>;
                        })}
                </List>
            </div>
        );
    }
}