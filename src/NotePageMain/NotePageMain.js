import React, { useContext } from "react";
import Note from "../Note/Note";
import Context from "../Context";
import { findNote } from "../notes-helpers";

export default function NotePageMain(props) {
  const context = useContext(Context);
  //why is noteId declared w {}?
  const { noteId } = props.match.params;
  const note = findNote(context.notes, noteId);

  //if note is loaded show note component and note content, if note not loaded yet show Loading note...
  return note ? (
    <section className="NotePageMain">
      <Note id={note.id} name={note.name} modified={note.modified} />
      <div className="NotePageMain_content">{note.content}</div>
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
