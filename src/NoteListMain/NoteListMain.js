import React from 'react'
import {Link} from 'react-router-dom'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import './NoteListMain.css'

export default function NoteListMain(props) {
    return (
        <section className='NoteListMain'>
            <ul>
                {props.notes.map(note =>
                    <li key={note.id}>
                        <Not
                            id={note.id}
                            name={note.name}
                            modified={note.modified}
                        />
                    </li>
                )}
            </ul>
            <div 
        </section>
    )
}