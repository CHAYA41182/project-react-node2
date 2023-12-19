import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Users = () => {
    const navigate = useNavigate();

    console.log('Users')
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [query, setQuery] = useState('');

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get('http://localhost:7001/api/users')
            //sort users by name
            data.sort((a, b) => a.name.localeCompare(b.name)) // Sort todos by name

            console.log(data)
            setUsers(data)
            setFilteredUsers(data)
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleQuery = (e) => {
        setQuery(e.target.value)
        setFilteredUsers(users.filter(user => user.name.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        /* בודק עם הוא נשלח על ידי האייקון או על ידי הכפתור */
        const id = e.target instanceof HTMLButtonElement ? e.target.id : e.target.parentElement instanceof HTMLButtonElement ? e.target.parentElement.id : e.target.parentElement.parentElement.id

        console.log(e.target)
        console.log(id)
        try {
            await axios.delete(`http://localhost:7001/api/users/${id}`)
            console.log('deleted')
            fetchUsers()
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleEdit = async (e) => {
        const id = e.target instanceof HTMLButtonElement ? e.target.id : e.target.parentElement instanceof HTMLButtonElement ? e.target.parentElement.id : e.target.parentElement.parentElement.id
        navigate(`/users/${id}/edit`)
    }

    const handleSort = (e) => {
        console.log(e.target.value)
        if (e.target.value === 'name') {
            setFilteredUsers(users.sort((a, b) => a.name.localeCompare(b.name)))
        }
        else if (e.target.value === 'email') {
            setFilteredUsers(users.sort((a, b) => a.email.localeCompare(b.email)))
        }
        else if (e.target.value === 'phone') {
            setFilteredUsers(users.sort((a, b) => a.phone.localeCompare(b.phone)))
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])


    return (
        <div className='elements'>
            <Link to="/users/create" ><FontAwesomeIcon icon={faPlus} className='add-btn' /></Link>
            <h1>Users</h1>
            <div className='sort'>
                <label htmlFor="sort">Sort by:</label>
                <select name="sort" id="sort" className='form-input sort-input' onChange={handleSort}>
                    <option value="name">Name</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                </select>
            </div>
            <div className='search'>
                <FontAwesomeIcon icon={faSearch} className='search-icon' />
                <input type="text" value={query} onChange={handleQuery} placeholder='Search...' className='sort-input form-input' />
                           </div>
            {
                filteredUsers.length === 0 ? <h3>No have users matching your search</h3> :
                filteredUsers.map(user => (
                    <div key={user.id} className='item'>
                        <div className='texts'>
                            <div className='title' onClick={(e) => { navigate(`/users/${user._id}`) }}  >
                                <div className='char' >{user.name[0]}</div>
                                <h3>{user.name}</h3>
                            </div>
                            <h5 className='description'>{user.email}</h5>
                        </div>
                        <div className='btns'>
                            <button onClick={handleEdit} id={user._id} ><FontAwesomeIcon icon={faEdit} /></button>
                            <button onClick={handleDelete} id={user._id} ><FontAwesomeIcon icon={faTrash} /></button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Users;