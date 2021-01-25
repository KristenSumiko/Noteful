import React, { Component } from "react";
import Context from "../Context";

class AddFolder extends Component {
  static contextType = Context;
  handleSubmit = (e) => {
    e.preventDefault();
    const newFolder = e.target.newFolderName.value;
    this.context.addFolder({ name: newFolder }, () => {
      this.props.history.push("/");
    });
  };
  render() {
    return (
      <form className="addFolder" onSubmit={this.handleSubmit}>
        <h2>Add Folder</h2>
        <input
          type="text"
          name="newFolderName"
          placeholder="New Folder Name"
          aria-label="New Folder Name"
          required
        />
        <input type="submit" />
      </form>
    );
  }
}

export default AddFolder;
