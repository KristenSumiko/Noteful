import React from "react";
import { NavLink, Link } from "react-router-dom";

import { countNotesForFolder } from "../notes-helpers";
import "./NoteListNav.css";

export default function NoteListNav(props) {
  return (
    <div className="NoteListNav">
      <ul className="NoteListNav_list">
        {props.folders.map((folder) => (
          <li key={folder.id}>
            <NavLink
              className="NoteListNav_folder-link"
              to={`/folder/${folder.id}`}
            >
              <span className="NoteListNav_num-notes">
                {countNotesForFolder(props.notes, folder.id)}
              </span>
              {folder.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="NoteListNav_button-wrapper">
        <Link
          to="/add-folder"
          className="NavCircleButton NoteListNav_add-folder-button"
        >
          <br />
          Folder
        </Link>
      </div>
    </div>
  );
}

NoteListNav.defaultProps = {
  folders: [],
};
