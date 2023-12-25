import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCheck, faTrash, faEdit, faXmark, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Todos = () => {
    const navigate = useNavigate();

    console.log('Todos')
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [query, setQuery] = useState('');

    const fetchTodos = async () => {
        try {
            const { data } = await axios.get('http://localhost:7001/api/tasks')
            data.sort((a, b) => a.title.localeCompare(b.title)) // Sort todos by title
            console.log(data)
            setTodos(data)
            setFilteredTodos(data)
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleQuery = (e) => {
        setQuery(e.target.value)
        setFilteredTodos(todos.filter(todo => todo.title.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    const handleComplete = async (e) => {
        e.preventDefault();
        const id = e.target.id
        try {
            await axios.put(`http://localhost:7001/api/tasks/${id}`, {
                status: e.target.className === 'completed' ? false : true
            })
        }
        catch (err) {
            console.log(err)
        }
        fetchTodos()

    }

    const handleDelete = async (e) => {
        e.preventDefault();
        /* בודק עם הוא נשלח על ידי האייקון או על ידי הכפתור */
        const id = e.target instanceof HTMLButtonElement ? e.target.id : e.target.parentElement instanceof HTMLButtonElement ? e.target.parentElement.id : e.target.parentElement.parentElement.id

        console.log(e.target)
        console.log(id)
        try {
            await axios.delete(`http://localhost:7001/api/tasks/${id}`)
            console.log('deleted')
            fetchTodos()
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleEdit = async (e) => {
        const id = e.target instanceof HTMLButtonElement ? e.target.id : e.target.parentElement instanceof HTMLButtonElement ? e.target.parentElement.id : e.target.parentElement.parentElement.id
        navigate(`/todos/${id}/edit`)
    }

    const handleSort = (e) => {
        console.log(e.target.value)
        if (e.target.value === 'title') {
            setFilteredTodos([...todos].sort((a, b) => a.title.localeCompare(b.title)))
        }
        else if (e.target.value === 'date') {
            setFilteredTodos([...todos].sort((a, b) => new Date(a.date) - new Date(b.date)))
        }
        else if (e.target.value === 'status') {
            setFilteredTodos([...todos].sort((a, b) => a.status - b.status))
        }
        else if (e.target.value === 'description') {
            setFilteredTodos([...todos].sort((a, b) => a.description.localeCompare(b.description)))
            console.log(filteredTodos)
        }
        
    }
    


    useEffect(() => {
        fetchTodos()
    }, [])

    return (
        <div className='elements'>
            <Link to="/todos/create" ><FontAwesomeIcon icon={faPlus} className='add-btn' /></Link>
            <h1>Todos</h1>
            <div className='actions'>
            <div className='search'>
                <FontAwesomeIcon icon={faSearch} className='search-icon' />
                <input type="text" value={query} onChange={handleQuery} placeholder='Search...' className='sort-input form-input' />
            </div>
            <div className='sort'>
                <label htmlFor="sort" >Sort by:</label>
                <select onChange={handleSort} className='sort-input form-input' >
                    <option value="title">title</option>
                    <option value="date">date</option>
                    <option value="status">status</option>
                    <option value="description">description</option>

                </select>
            </div>
            </div>
            {
                filteredTodos.length === 0 ? <div className='no-results' >No have todos matching your search</div> :
                filteredTodos.map(todo => (
                    <div key={todo.id} className='item'>
                        <div className='texts'>
                            <div className='title' onClick={(e) => { navigate(`/todos/${todo._id}`) }}  >
                                <div className='char' >{(String)(todo.description)[0]}</div>
                                <h3  >{todo.title}</h3>
                            </div>

                            <p className='date' >{new Date(todo.date).toLocaleDateString()}</p>
                            <p className='description' >{todo.description}</p>
                        </div>
                        <div className='btns'>
                            <button className={todo.status ? 'completed' : 'not-completed'} onClick={handleComplete} id={todo._id}> {todo.status ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faXmark} />} Complete</button>
                            <button onClick={handleDelete} id={todo._id} ><FontAwesomeIcon icon={faTrash} /></button>
                            <button onClick={handleEdit} id={todo._id} ><FontAwesomeIcon icon={faEdit} /></button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Todos;