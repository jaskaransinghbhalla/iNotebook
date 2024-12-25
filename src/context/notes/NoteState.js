import NoteContext from "./NoteContext";
import { useState } from "react";
import axios from 'axios';

const NoteState = (props) => {
    const host = "http://localhost:4000";
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);
    const token = localStorage.getItem('token');
    const getNotes = () => {
        const url = `${host}/api/notes/fetchallnotes`;
        axios.get(url, {
            headers: { 'Content-Type': 'application/json', 'auth-token': token },
        })
            .then(function (response) {
                const json = response.data
                setNotes(json)
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
            });

    }

    // Add a Note
    const addNote = (title, description, tag) => {
        axios.post(`${host}/api/notes/addnote`,
            { title: title, description: description, tag: tag }, {
            headers:
                { 'Content-Type': 'application/json', 'auth-token': token }
        }
        )
            .then(function (response) {
                const note = response.data
                setNotes(notes.concat(note))
            }).catch(function (error) {
                console.log(error)
                // props.showAlert("Invalid Credentials", "danger")
            })

    }

    const editNote = async (id, title, description, tag) => {
        const url = `${host}/api/notes/updatenote/${id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('token') },
            body: JSON.stringify({ title, description, tag })
        });
        let newNotes = JSON.parse(JSON.stringify(notes))

        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    const deleteNote = async (id) => {
        const url = `${host}/api/notes/deletenote/${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'auth-token': token },
        });
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState;

