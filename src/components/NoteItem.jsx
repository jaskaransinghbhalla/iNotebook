import React, { useContext } from 'react'
import NoteContext from "../context/notes/NoteContext";

export default function NoteItem(props) {
    const context = useContext(NoteContext);
    const { deleteNote } = context;

    const { note, updateNote } = props;

    const handleDeleteClick = () => {
        deleteNote(note._id)
        props.showAlert("Note Deleted Successfully", "success")
    }
    return (
        <div className='col-md-3 my-3'>
            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa fa-duotone fa-trash fa-1x mx-2" onClick={handleDeleteClick}></i>
                    <i className="fa fa-light fa-pen-to-square fa-1x mx-2" onClick={() => updateNote(note)}></i>
                </div>
                <p className="card-text"> {note.description}</p>
            </div>
        </div>
        </div >
    )
}
