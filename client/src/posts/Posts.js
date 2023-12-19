import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Posts = () => {
    const navigate = useNavigate();
    console.log('Posts')
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [query, setQuery] = useState('');

    const fetchPosts = async () => {
        try {
            const { data } = await axios.get('http://localhost:7001/api/posts')
            //sort posts by title
            data.sort((a, b) => a.title.localeCompare(b.title))
            console.log(data)
            setPosts(data)
            setFilteredPosts(data)
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        const id = e.target instanceof HTMLButtonElement ? e.target.id : e.target.parentElement instanceof HTMLButtonElement ? e.target.parentElement.id : e.target.parentElement.parentElement.id
        try {
            await axios.delete(`http://localhost:7001/api/posts/${id}`)
            console.log('deleted')
            fetchPosts()
        }
        catch (err) {
            console.log(err)
        }
    }


    const handleQuery = (e) => {
        setQuery(e.target.value)
        setFilteredPosts(posts.filter(post => post.title.toLowerCase().includes(e.target.value.toLowerCase())))
    }




    const handleEdit = async (e) => {
        const id = e.target instanceof HTMLButtonElement ? e.target.id : e.target.parentElement instanceof HTMLButtonElement ? e.target.parentElement.id : e.target.parentElement.parentElement.id
        navigate(`/posts/${id}/edit`)
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    if (filteredPosts.length === 0)
        return <div className='elements'>
            <Link to="/posts/create" ><FontAwesomeIcon icon={faPlus} className='add-btn' /></Link>
            <h1>Posts</h1>
            <div className='search'>
                <FontAwesomeIcon icon={faSearch} />
                <input type="text" value={query} onChange={handleQuery} placeholder='Search...' className='form-input search-input' />
            </div>
            <h1>no have post match your search</h1>

        </div>

    return (
        <div className='elements'>
            <Link to="/posts/create" ><FontAwesomeIcon icon={faPlus} className='add-btn' /></Link>
            <h1>Posts</h1>
            <div className='search'>
                <FontAwesomeIcon icon={faSearch} />
                <input type="text" value={query} onChange={handleQuery} placeholder='Search...' className='form-input search-input' />
            </div>            {
                filteredPosts.map(post => (
                    <div key={post.id} className='item'>
                        <div className='texts'>
                            <div className='title' onClick={(e) => { navigate(`/posts/${post._id}`) }}  >
                                <div className='char' >{post.title[0]}</div>
                                <h3>{post.title}</h3>
                            </div>
                            <h5 className='description'>{post.author}</h5>
                            <p className='description'>{(String(post.body).length > 300) ? String(post.body).substring(0, 300) + '...' : post.body}</p>
                        </div>
                        <div className='btns'>
                            <button onClick={handleEdit} id={post._id} ><FontAwesomeIcon icon={faEdit} /></button>
                            <button onClick={handleDelete} id={post._id} ><FontAwesomeIcon icon={faTrash} /></button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Posts;