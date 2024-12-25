import React, { useContext, useState } from 'react'
import NoteContext from "../context/notes/NoteContext";

export default function AddNote(props) {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        props.showAlert("Note Added Successfully", "success")
        setNote({ title: "", description: "", tag: "" })
    }
    return (
        <div>
            <h2>Add a Note</h2>
            <div className="container mb-3">
                <form>
                    <div className="form-group my-1">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" name="title" id="title" value={note.title} placeholder="Enter Title" onChange={handleChange} />
                    </div>
                    <div className="form-group my-1">
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" id="description" value={note.description} name="description" placeholder="Enter Description" onChange={handleChange} />
                    </div>
                    <div className="form-group my-1">
                        <label htmlFor="tag">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} placeholder="Enter Tag" onChange={handleChange} />
                    </div>
                    <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-dark my-1" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}
