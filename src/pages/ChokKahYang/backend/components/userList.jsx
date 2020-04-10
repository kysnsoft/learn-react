import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

const userList = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [users, setUsers] = useState([])
    const [tempDelete, setTempDelete] = useState('')
    const [msg, setMsg] = useState('')


    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            await axios.get('/api/users')
                .then(res => setUsers(res.data))
                .catch(err => {
                    setError(`${err}`)
                    setTimeout(() => setError(''), 5000)
                })
            setLoading(false)

        }
        fetchUser()
    }, [])

    useEffect(() => {
        if (tempDelete) {
            const deleteUser1 = async () => {
                await axios.delete('/api/users/' + tempDelete)
                    .then(res => {
                        setUsers(users.filter(user => user._id !== tempDelete))
                        setTempDelete('')
                        setMsg(`User: ${res.data}`)
                    })
                    .catch(err => {
                        setError(`${err}`)
                        setTimeout(() => setError(''), 5000)
                    })
            }
            deleteUser1()
        }
        
        const timer = setTimeout(() => setMsg(''), 5000)
        return () => {
            clearTimeout(timer)
        }
    }, [tempDelete])

    if (loading) return <h2 className="font-weight-bold">Loading...</h2>
    if (error) return <h2 className="text-danger font-weight-bold">{error}</h2>

    return (

        <div>
            {msg && <h3 className="text-danger font-weight-bold text-center m-2">{msg}</h3>}
            <table className="table text-center">
                <thead className="thead-light">
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Position</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="text-white">
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.age}</td>
                            <td>{user.position}</td>
                            <td>
                                <Link to={{ pathname: `/users/edit/${user._id}`, state: { user } }}
                                    className="btn btn-dark mx-2">Edit</Link>
                                <a href="#" onClick={() => setTempDelete(user._id)}
                                    className="btn btn-dark" >Delete</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default userList;
