import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
    const [login, setLogin] = useState({ email: "", password: "" })
    let navigate = useNavigate();


    const handleChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const host = "http://localhost:4000";
        const url = `${host}/api/auth/login`;
        axios.post(url, {
            email: login.email,
            password: login.password
        }).then(function (response) {
            props.showAlert("Logged In Successfully", "success")
            localStorage.setItem('token', response.data.authToken)
            navigate('/')
        }).catch(function (error) {
            console.log(error);
            props.showAlert("Invalid Credentials", "danger")
        });

    }

    return (
        <div className='container' >
            <form>
                <div className="form-group my-3">
                    <label htmlFor="email">Email address</label>
                    <input onChange={handleChange} type="email" className="form-control" value={login.email} id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="password">Password</label>
                    <input onChange={handleChange} type="password" name="password" className="form-control" value={login.password} id="password" placeholder="Password" />
                </div>
                <div>
                    <button onClick={handleSubmit} className="btn btn-dark my-3" >Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login