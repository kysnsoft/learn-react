import React, { useState, useEffect } from 'react';
import axios from 'axios'


function editUser(props) {

    const { name, psw, age, position } = props.location.state.user

    const [load, setLoad] = useState(false)
    const [tempName, setName] = useState(name)
    const [tempPsw, setPsw] = useState('')
    const [tempAge, setAge] = useState(age)
    const [tempPosition, setPosition] = useState(position)
    const [errorMsg, setErrorMsg] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoad(true)

        const editUser = {
            name: tempName,
            psw: tempPsw,
            age: tempAge,
            position: tempPosition,
        }

        axios.post('/api/users/edit/' + props.match.params.id, editUser)
            .then(() => location.replace('/users'))
            .catch(err => {
                setLoad(false)
                setErrorMsg(err.response.data)
            })

    }

    if (load) return <h2>Processing...</h2>

    return (
        <div>
            <h3>Edit User</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name: </label>
                    <input type="text"
                        required
                        className="form-control w-50"
                        value={tempName}
                        placeholder={name}
                        onChange={(e) => setName(e.target.value.trim())} />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input type="text"
                        required
                        className="form-control w-50"
                        value={tempPsw}
                        placeholder={psw}
                        onChange={(e) => setPsw(e.target.value.trim())} />
                </div>
                <div className="form-group">
                    <label>Age: </label>
                    <input type="number"
                        required
                        className="form-control w-50"
                        value={tempAge}
                        placeholder={age}
                        onChange={(e) => setAge(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Position: </label>
                    <input type="text"
                        required
                        className="form-control w-50"
                        value={tempPosition}
                        placeholder={position}
                        onChange={(e) => setPosition(e.target.value)} />
                </div>
                <div>
                    {errorMsg !== '' && <h6 className="font-weight-bold text-danger">{errorMsg}</h6>}
                </div>
                <div className="form-group">
                    <input type="submit" value="Edit User" className="btn btn-dark" />
                </div>
            </form>
            <button onClick={props.history.goBack}
                className="btn btn-dark">Back</button>
        </div >
    )
}

export default editUser
