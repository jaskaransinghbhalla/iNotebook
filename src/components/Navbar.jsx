import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
export default function Navbar() {
    let navigate = useNavigate();
    let location = useLocation()
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active" : null}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? "active" : null}`} aria-current="page" to="/about">About</Link>
                            </li>
                        </ul>
                        <form className='d-flex'>
                            {!localStorage.getItem('token') ?
                                <>
                                    <Link className='btn btn-dark' to='/login' role='button'>Login</Link>
                                    <Link className='btn btn-dark' to='/signup' role='button'>SignUp</Link>
                                </>
                                :
                                <>
                                    <Link onClick={handleLogout} className='btn btn-dark' to='/login' role='button'>Logout</Link>
                                </>
                            }
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}
