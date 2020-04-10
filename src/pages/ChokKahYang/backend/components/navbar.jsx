import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark navbar-expand-lg">
                <NavLink to="/users"
                    exact activeStyle={{ fontWeight: 'bold', backgroundColor: '#eee', color: 'black' }}
                    className="nav-link btn btn-dark mx-2">User List</NavLink>
                <NavLink to="/users/create"
                    exact activeStyle={{ fontWeight: 'bold', backgroundColor: '#eee', color: 'black' }}
                    className="nav-link btn btn-dark mx-2">New User</NavLink>
                <NavLink to="/users/login"
                    exact activeStyle={{ fontWeight: 'bold', backgroundColor: '#eee', color: 'black' }}
                    className="nav-link btn btn-dark mx-2">Login</NavLink>
            </nav>
        );
    }
}