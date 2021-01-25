import React, { Component } from "react";
import Context from "../Context";

class AddNote extends Component {
  static contextType = Context;
  handleSubmit = (e) => {
    e.preventDefault();
    const newNote = {
      name: e.target.newNoteName.value,
      content: e.target.newNoteContent.value,
      folderId: e.target.folderId.value,
      modified: new Date(),
    };
    this.context.addNote(newNote, () => {
      this.props.history.push("/");
    });
  };
  render() {
    return (
      <form className="addNote" onSubmit={this.handleSubmit}>
        <h2>Add Note</h2>
        <input
          type="text"
          name="newNoteName"
          placeholder="New Note Name"
          aria-label="New Note Name"
          required
        />
        <input
          type="text"
          name="newNoteContent"
          placeholder="Write New Note Here"
          aria-label="Write New Note Here"
          required
        />
        <select name="folderId" required>
          {this.context.folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
        <input type="submit" />
      </form>
    );
  }
}

export default AddNote;
