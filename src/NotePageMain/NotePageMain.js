import React, { useContext } from "react";
import Note from "../Note/Note";
import Context from "../Context";
import { findNote } from "../notes-helpers";
import "./NotePageMain.css";

export default function NotePageMain(props) {
  const context = useContext(Context);

  const { noteId } = props.match.params;
  const note = findNote(context.notes, noteId);

  return note ? (
    <section className="NotePageMain">
      <Note id={note.id} name={note.name} modified={note.modified} />
      <div className="NotePageMain_content">
        {note.content.split(/\n \r|\n/).map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </section>
  ) : (
    <h2>Loading Note...</h2>
  );
}

NotePageMain.defaultProps = {
  note: {
    content: "",
  },
};
