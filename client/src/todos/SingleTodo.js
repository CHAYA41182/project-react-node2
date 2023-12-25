import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faCheck, faTrash, faEdit, faXmark } from '@fortawesome/free-solid-svg-icons';
import Rating from 'react-rating';
import { faStar, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'


const SingleTodo = () => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:7001/api/tasks/${id}`)
            console.log('deleted')
            navigate('/todos')
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleEdit = async (e) => {
        const id = e.target instanceof HTMLButtonElement ? e.target.id : e.target.parentElement instanceof HTMLButtonElement ? e.target.parentElement.id : e.target.parentElement.parentElement.id
        navigate(`/todos/${id}/edit`)
    }

    const handleComplete = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:7001/api/tasks/${id}`, {
                status: !todo.status
            })
        }
        catch (err) {
            console.log(err)
        }
        setTodo({
            ...todo,
            status: !todo.status
        })
    }

    const [todo, setTodo] = useState([]);
    const { id } = useParams();


    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const { data } = await axios.get(`http://localhost:7001/api/tasks/${id}`)
                console.log(data)
                setTodo(data)
            }
            catch (err) {
                console.log(err)
            }
        }

        fetchTodo();
    }, [id]); // include id in the dependencies array

    if (!todo) return <div>Loading...</div>;
    console.log(todo)
    return (

        <div className="single-container">
            <Link to="/todos" ><FontAwesomeIcon icon={faRightFromBracket} /></Link>
            <div className='texts'>
                <div className='' >
                    <div className='icon' >{todo.icon}</div>
                    <h1  >{todo.title}</h1>
                </div>

                <Rating className="rating rating-single"
                    initialRating={todo.range}
                    emptySymbol={<FontAwesomeIcon icon={faStar} color="grey" style={{ fontSize: "24px" }} />}
                    fullSymbol={<FontAwesomeIcon icon={faStar} color="gold" style={{ fontSize: "24px" }} />}
                    readonly
                />
                <p className='date' >{new Date(todo.createdAt).toLocaleDateString()}</p>
                <p className='description' >{todo.description}</p>
            </div>            
            {todo.important && <FontAwesomeIcon color='red' icon={faCircleExclamation} />}


            {todo && todo.tags && todo.tags.map(tag => <span key={tag}>  #{tag}  </span>)}


            <div className='btns'>
                <button className={todo.status ? 'completed' : 'not-completed'} onClick={handleComplete} id={todo._id}> {todo.status ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faXmark} />} Complete</button>
                <button onClick={handleDelete} id={todo._id} ><FontAwesomeIcon icon={faTrash} /></button>
                <button onClick={handleEdit} id={todo._id} ><FontAwesomeIcon icon={faEdit} /></button>
            </div>

        </div>
    );
}

export default SingleTodo;