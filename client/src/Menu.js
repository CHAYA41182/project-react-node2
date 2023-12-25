import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCheck, faNewspaper, faCamera, faHome } from '@fortawesome/free-solid-svg-icons'
import React from "react";

const Menue = () => {
    return <menu className="menu">
        <ul>

            <li><NavLink to="/" className={({ isActive }) => isActive ? "active-menu" : ""}><FontAwesomeIcon icon={faHome} /> Home</NavLink></li>
            <li><NavLink to="/users" className={({ isActive }) => isActive ? "active-menu" : ""}><FontAwesomeIcon icon={faUser} /> Users</NavLink></li>
            <li><NavLink to="/posts" className={({ isActive }) => isActive ? "active-menu" : ""}><FontAwesomeIcon icon={faNewspaper} /> Posts</NavLink></li>
            <li><NavLink to="/photos" className={({ isActive }) => isActive ? "active-menu" : ""}><FontAwesomeIcon icon={faCamera} /> Photos</NavLink></li>
            <li><NavLink to="/todos" className={({ isActive }) => isActive ? "active-menu" : ""}><FontAwesomeIcon icon={faCheck} /> Todos</NavLink></li>
        </ul>
    </menu>
}

export default Menue;