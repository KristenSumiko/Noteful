import React, { Component } from "react";
import Context from "../Context";

class AddNote extends Component {
  static contextType = Context;
  handleSubmit = (e) => {
    e.preventDefault();
    const newNote = {
      name: e.target.newNoteName.value,
      content: e.target.newNoteContent.value,
      modified: new Date(),
    };
    this.context.addNote(newNote, () => {
      //e.target vs this.??
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
        <input type="submit" />
      </form>
    );
  }
}

export default AddNote;
