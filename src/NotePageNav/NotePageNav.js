import React from "react";
import "./NotePageNav.css";

export default function NotePageNav(props) {
  return (
    <div className="NotePageNav">
      <button
        onClick={() => props.history.goBack()}
        className="NavCircleButton NotePageNav_back-button"
      >
        <br />
        Back
      </button>

      {props.folder && (
        <h3 className="NotePageNav_folder-name">{props.folder.name}</h3>
      )}
    </div>
  );
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => {},
  },
};
