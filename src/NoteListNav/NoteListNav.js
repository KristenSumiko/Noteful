import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import Context from "../Context";
import { countNotesForFolder } from "../notes-helpers";
import "./NoteListNav.css";

export default function NoteListNav(props) {
  const context = useContext(Context);
  return (
    <div className="NoteListNav">
      <ul className="NoteListNav_list">
        {context.folders.map((folder) => (
          <li key={folder.id}>
            <NavLink
              className="NoteListNav_folder-link"
              to={`/folder/${folder.id}`}
            >
              {folder.name} &mdash;&nbsp;
              <span className="NoteListNav_num-notes">
                {countNotesForFolder(context.notes, folder.id)}
              </span>
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
