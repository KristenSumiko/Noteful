import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Note from "../Note/Note";
import Context from "../Context";
import { getNotesForFolder } from "../notes-helpers";

export default function NoteListMain(props) {
  const context = useContext(Context);
  const { folderId } = props.match.params;
  const notesForFolder = getNotesForFolder(context.notes, folderId);

  return (
    <section className="NoteListMain">
      <ul>
        {notesForFolder.map((note) => (
          <li key={note.id}>
            <Note id={note.id} name={note.name} modified={note.modified} />
          </li>
        ))}
      </ul>
      <div className="NoteListMain_button-container">
        <Link
          to="/add-note"
          className="NavCircleButton NoteListMain_add-note-button"
        >
          <br />
          Add New Note
        </Link>
      </div>
    </section>
  );
}
