import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const SingleUser = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState([]);
    const { id } = useParams();

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:7001/api/users/${id}`)
            console.log('deleted')
            navigate('/users')
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleEdit = async (e) => {
        const id = e.target instanceof HTMLButtonElement ? e.target.id : e.target.parentElement instanceof HTMLButtonElement ? e.target.parentElement.id : e.target.parentElement.parentElement.id
        navigate(`/users/${id}/edit`)
    }

    useEffect(() => {
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

        fetchUser();
    }, [id]); // include id in the dependencies array

    if (!user) return <div>Loading...</div>;
    console.log(user)
    return (

        <div className="single-container">
            <Link to="/users" ><FontAwesomeIcon icon={faRightFromBracket} /></Link>
            <div className='texts'>
                <div className='' >
                    <h1>{user.name}</h1>
                </div>
                <h3>{user.email}</h3>
                <h3>{user.phone}</h3>
                <h3>{user.password}</h3>
                <div className='tags'>
                {user.roles && user.roles.map(role => <span className='tag' key={role}>  #{role}  </span>)}
                </div>
            </div>
            <div className='btns'>
                <button onClick={handleEdit} id={user._id} ><FontAwesomeIcon icon={faEdit} /></button>
                <button  onClick={handleDelete} className=''><FontAwesomeIcon icon={faTrash} /> </button>
            </div>
        </div>

    );
}

export default SingleUser;