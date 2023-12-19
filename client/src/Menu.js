import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCheck, faNewspaper, faCamera, faHome} from '@fortawesome/free-solid-svg-icons'
import React from "react";

const Menue = () => {
    return <menu className="menu">
        <ul >
            <li><Link to="/" className="home-li" ><FontAwesomeIcon icon={faHome} /> Home</Link></li>
            <li><Link to="/users" ><FontAwesomeIcon icon={faUser} /> Users</Link></li>
            <li><Link to="/todos" ><FontAwesomeIcon icon={faCheck} /> Tasks </Link></li>
            <li><Link to="/posts" ><FontAwesomeIcon icon={faNewspaper} /> Posts</Link></li>
            <li><Link to="/photos" ><FontAwesomeIcon icon={faCamera} /> Photos</Link></li>
        </ul>
    </menu>
}

export default Menue;