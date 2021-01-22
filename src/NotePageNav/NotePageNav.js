import React, { useContext } from "react";
import Context from "../Context";
import { findNote, findFolder } from "../notes-helpers";

export default function NotePageNav(props) {
  const context = useContext(Context);
  const { noteId } = props.match.params;
  const note = findNote(context.notes, noteId) || {};
  const folder = findFolder(context.folders, note.folderId);

  return (
    <div className="NotePageNav">
      <button
        onClick={() => props.history.goBack()}
        className="NavCircleButton NotePageNav_back-button"
      >
        <br />
        Back
      </button>

      {folder && <h3 className="NotePageNav_folder-name">{folder.name}</h3>}
    </div>
  );
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => {},
  },
};
