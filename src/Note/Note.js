import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Context from "../Context";
import PropTypes from "prop-types";

export default function Note(props) {
  const context = useContext(Context);
  const history = useHistory();

  //created handle delete function that deletes note and returns to updated home page
  const handleDelete = (noteid) => {
    context.deleteNote(noteid);
    history.push("/");
  };

  //return note w name, remove button that calls handleDelete when clicked, and modified date
  return (
    <div className="Note">
      <h2 className="Note_title">
        <Link to={`/note/${props.id}`}>{props.name}</Link>
      </h2>
      <button
        onClick={() => handleDelete(props.id)}
        className="Note_delete"
        type="button"
      >
        remove
      </button>
      <div className="Note_dates">
        <div className="Note_dates-modified">
          Modified{" "}
          <span className="Date">
            {new Date(props.modified).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}

Note.propTypes = {
  id: PropTypes.string.isRequired,
  modified: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

Note.defaultProps = {
  id: 0,
  modified: "2020-01-01",
  name: "Loading Note...",
};
