import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
import AddFolder from "../AddFolder/AddFolder";
import AddNote from "../AddNote/AddNote";
import Context from "../Context";
import Error from "../Error";

class App extends Component {
  //setting up state, with an empty notes array, empty folders array and some CRUD(Create, Read, Update, Delete) methods
  //deleteNote function filled out
  state = {
    notes: [],
    folders: [],
    addFolder: (newFolder, cb) => {
      fetch("http://localhost:9090/folders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFolder),
      })
        .then((response) => response.json())
        .then((folder) =>
          this.setState({ folders: [...this.state.folders, folder] }, cb)
        )
        .catch((error) => {
          console.log(error);
        });
    },
    addNote: (newNote, cb) => {
      fetch("http://localhost:9090/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      })
        .then((response) => response.json())
        .then((note) =>
          this.setState({ notes: [...this.state.notes, note] }, cb)
        )
        .catch((error) => {
          console.log(error);
        });
    },
    //deleteNote updates notes array in state and says to filter and keep all notes whose id was not selected to remove
    deleteNote: (id) => {
      this.setState({
        notes: this.state.notes.filter((note) => note.id !== id),
      });
    },
  };

  //componentDidMount just tells us everything wrapped in it happens once the initial page render
  componentDidMount() {
    const API_ENDPOINT = `http://localhost:9090`;
    //Promise.all says to wait until all api calls wrapped in it are completed before moving on to the then statements. This makes it so notes and folders can be rendered simultaneously no matter if one if retrieved quicker
    Promise.all([
      fetch(`${API_ENDPOINT}/notes`),
      fetch(`${API_ENDPOINT}/folders`),
    ])
      //checks if both fetches are OK, if either is not then move on to catch statement
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) return notesRes.json().then((e) => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then((e) => Promise.reject(e));

        //returns responses as json objects
        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      //updates state to retrieved notes and folders
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      //if any errors caught then logs error to console
      .catch((error) => {
        console.error({ error });
      });
  }

  renderNavRoutes() {
    return (
      //map over home and folder paths and create routes
      //create Nav routes for notes, and add folder and add note
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
        <Route path="/note/:noteId" component={NotePageNav} />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    return (
      //creates Main routes for home, folder, and note
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
        <Route path="/note/:noteId" component={NotePageMain} />
        <Route path="/add-folder" component={AddFolder} />
        <Route path="/add-note" component={AddNote} />
      </>
    );
  }

  //renders app's html foundation wrapped in COntext.Provider
  //Context is set to state to make state easily accessible to other components
  render() {
    return (
      <Context.Provider value={this.state}>
        <div className="App">
          <nav className="App_nav">{this.renderNavRoutes()}</nav>
          <header className="App_header">
            <h1>
              <Link to="/">Noteful</Link>
            </h1>
          </header>
          <Error>
            <main className="App_main">{this.renderMainRoutes()}</main>
          </Error>
        </div>
      </Context.Provider>
    );
  }
}

export default App;
