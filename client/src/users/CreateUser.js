import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const CreateUser = () => {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const roles = []
        formData.get("isAdmin")?roles.push("admin", "user"):roles.push("user")

        const user = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            roles:roles
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
                    <input type="text" name="name" className="form-control" required />
                    </div>
                    <div className="email-container">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" className="form-control" required />
                    </div>
                    <div className="password-container">
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" className="form-control" required />
                    </div>
                    <div className="roles-container">
                    <input type="checkbox" name="isAdmin" className="form-check-input" />
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