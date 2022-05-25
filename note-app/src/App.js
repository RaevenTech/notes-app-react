import { useState, useEffect } from "react";
import "./App.css";
import { nanoid } from "nanoid";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";

function App() {
    const [notes, setNotes] = useState(JSON.parse(localStorage.notes)); //notes here is passed as a prop Sidebar comp.
    const [activeNote, setActiveNote] = useState(false);

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes) || []);
    }, [notes]);

    const onAddNote = () => {
        // function for creating a new note
        const newNote = {
            // each new not needs to be an boject with obj keys for each note
            id: nanoid(),
            title: "Untitled",
            body: "",
            lastModified: Date.now(),
        };
        setNotes([newNote, ...notes]); //new note created is added to the current notes using ...spread operator
    };

    const onUpdateNote = (updatedNote) => {
        const upDatedNotesArray = notes.map((note) => {
            if (note.id === activeNote) {
                return updatedNote;
            }
            return note;
        });
        setNotes(upDatedNotesArray);
    };

    const onDeleteNote = (idToDelete) => {
        setNotes(notes.filter((note) => note.id !== idToDelete));
    };

    const getActiveNote = () => {
        return notes.find((note) => note.id === activeNote);
    };

    return (
        <div className="App">
            <Sidebar
                notes={notes}
                onAddNote={onAddNote}
                onDeleteNote={onDeleteNote}
                activeNote={activeNote}
                setActiveNote={setActiveNote}
            />
            <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
        </div>
    );
}

export default App;
