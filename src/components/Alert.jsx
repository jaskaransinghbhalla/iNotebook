import React from 'react'

export default function Alert(props) {
    const Capitalize = (word) => {
        if (word === 'danger') {
            word = 'Error';
        }

        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    return (
        <div style={{ height: '50px' }}>

            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{Capitalize(props.alert.type)} </strong>{props.alert.msg}
                <button type="button" className="btn-close" data-dismiss="alert" data-bs-dismiss="alert" aria-label="Close">
                </button>
            </div>}
        </div>
    )
}