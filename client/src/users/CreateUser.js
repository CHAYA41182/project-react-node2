import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useRef } from "react";

const CreateUser = () => {
    const navigate = useNavigate();
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const isAdminRef = useRef();
    const phoneRef = useRef();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const roles = []

        const user = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            roles: roles,
            phone: phoneRef.current.value

        };
        
       await axios.post("http://localhost:7001/api/users",user).then(()=>{
        /*מעביר לדף localhost:3000/users */
        navigate('/users');

       })
    };

    return (
        <div className="create-container">
            <Link to="/users" ><FontAwesomeIcon icon={faRightFromBracket} /></Link>

            <h1 className="create--title">Create User</h1>
            <form className="create-form" onSubmit={handleSubmit}>
                    <div className="name-container">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" className="form-control" required ref={nameRef} />
                    </div>
                    <div className="email-container">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" className="form-control" required ref={emailRef} />
                    </div>
                    <div className="password-container">
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" className="form-control" required ref={passwordRef} />
                    </div>
                    <div className="phone-container">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" name="phone" className="form-control" ref={phoneRef} />
                    </div>
                    <div className="roles-container">
                    <input type="checkbox" name="isAdmin" className="form-check-input" ref={isAdminRef} />
                    <label htmlFor="isAdmin">isAdmin</label>
                    </div>

                    
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Create</button>
                    </div>
            </form>
        </div>
    );
}

export default CreateUser;