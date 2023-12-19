import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket} from '@fortawesome/free-solid-svg-icons';


const UpdateUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState([]);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const isAdminRef = useRef();

    const fetchUser = async () => {
        try {
            const { data } = await axios.get(`http://localhost:7001/api/users/${id}`) 
            console.log(data)
            setUser(data)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const roles = []
        isAdminRef.current.checked?roles.push("admin", "user"):roles.push("user")
        


        const user = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            roles:roles
        };
        
       await axios.put(`http://localhost:7001/api/users/${id}`,user).then(()=>{
        /*מעביר לדף localhost:3000/users */
        navigate('/users');

       })
    };

    return (
        <div className="create-container">
            <Link to="/users" ><FontAwesomeIcon icon={faRightFromBracket} /></Link>
            <h1 className="create--title">Update User</h1>
            <form className="create-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" className="form-control" required defaultValue={user.name} ref={nameRef} />
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" className="form-control" required defaultValue={user.email} ref={emailRef} />
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" className="form-control" required defaultValue={user.password} ref={passwordRef} />
                    <br />
                    <input type="checkbox" name="isAdmin" className="form-check-input" defaultChecked={user.isAdmin} ref={isAdminRef} />
                    <label htmlFor="isAdmin">isAdmin</label>
                    <br />
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                </div>
            </form>
        </div>
    );
}


 export default UpdateUser;
