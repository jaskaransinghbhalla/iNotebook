import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
    const [signup, setSignup] = useState({ name: "", email: "", password: "", cpassword: "" })
    let navigate = useNavigate();

    const handleChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        const { name, email, password } = signup;
        e.preventDefault()
        // const host = "http://localhost:4000";
        // const url = `${host}/api/auth/createUser`;
        // const response = await fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ name, password, email })
        // });
        // const json = await response.json();
        // if (json.success) {
        //     localStorage.setItem('token', json.authtoken)
        //     navigate('/')
        //     props.showAlert("Sign Up Successfully", "success")
        // } else {
        //     props.showAlert("Invalid Credentials", "danger")
        // }

        const host = "http://localhost:4000";
        const url = `${host}/api/auth/createUser`;
        axios.post(url, {
            name: name,
            email: email,
            password: password
        }).then(function (response) {
            localStorage.setItem('token', response.data.authtoken)
            props.showAlert("Sign Up Successfully", "success")
            navigate('/')
        }).catch(function (error) {
            props.showAlert("Invalid Credentials", "danger")
        });

    }

    return (
        <div className='container' onSubmit={handleSubmit}>
            <form>
                <div className="form-group my-3">
                    <label htmlFor="name">Name</label>
                    <input onChange={handleChange} type="name" className="form-control" value={signup.name} id="name" name="name" aria-describedby="emailHelp" placeholder="Enter name" />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="email">Email address</label>
                    <input onChange={handleChange} type="email" className="form-control" value={signup.email} id="email" name="email" aria-describedby="email" placeholder="Enter email" />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="password">Password</label>
                    <input onChange={handleChange} type="password" name="password" className="form-control" value={signup.password} id="password" placeholder="Password" minLength={5} required />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input onChange={handleChange} type="password" name="cpassword" className="form-control" value={signup.cpassword} id="cpassword" placeholder="Password" minLength={5} required />
                </div>
                <div>
                    <button type="submit" className="btn btn-dark my-3">Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp