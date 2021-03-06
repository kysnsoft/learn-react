import React, { useState, useEffect } from 'react';
import axios from 'axios'


const createUser = (props) => {

    const [name, setName] = useState('')
    const [psw, setPsw] = useState('')
    const [age, setAge] = useState('')
    const [position, setPosition] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = {
            name,
            psw,
            age,
            position
        }

        axios.post('http://localhost:3000/users/add', user)
            .then(() => {
                setName('')
                setPsw('')
                setAge('')
                setPosition('')
                location.replace('/users')
            })
            .catch(err => { setErrorMsg(err.response.data) })
    }

    return (
        <div>
            <h3 className="font-weight-bold">Create New User</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="mt-1">Name: </label>
                    <input type="text" required className="form-control w-50"
                        value={name}
                        onChange={(e) => setName(e.target.value.trim())} />
                    <label className="mt-1">Password: </label>
                    <input type="text" required className="form-control w-50"
                        value={psw}
                        onChange={(e) => setPsw(e.target.value.trim())} />
                    <label className="mt-1">Age: </label>
                    <input type="number" required className="form-control w-50"
                        value={age}
                        onChange={(e) => setAge(e.target.value)} />
                    <label className="mt-1">Position: </label>
                    <input type="text" required className="form-control w-50"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-dark" />
                </div>
                <div>
                    {errorMsg !== '' && <h6 className="font-weight-bold text-danger">{errorMsg}</h6>}
                </div>
            </form>
        </div>
    );
}

export default createUser;
