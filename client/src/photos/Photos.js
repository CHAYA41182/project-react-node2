import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Photos = () => {
    const navigate = useNavigate();
    const [photos, setPhotos] = useState([]);
    const [filteredPhotos, setFilteredPhotos] = useState([]);
    const [query, setQuery] = useState('');

    const fetchPhotos = async () => {
        try {
            const { data } = await axios.get('http://localhost:7001/api/photos');
            data.sort((a, b) => a.title.localeCompare(b.title)); // Sort photos by title
            setPhotos(data);
            setFilteredPhotos(data);
            console.log(filteredPhotos); // Before sortPhotos()
        } catch (err) {
            console.log(err);
        }
    };

    const handleQuery = (e) => {
        setQuery(e.target.value);
        setFilteredPhotos(photos.filter(photo => photo.title.toLowerCase().includes(e.target.value.toLowerCase())));
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        const id = e.target instanceof HTMLButtonElement ? e.target.id : e.target.parentElement instanceof HTMLButtonElement ? e.target.parentElement.id : e.target.parentElement.parentElement.id;
        try {
            await axios.delete(`http://localhost:7001/api/photos/${id}`);
            fetchPhotos();
        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = async (e) => {
        const id = e.target instanceof HTMLButtonElement ? e.target.id : e.target.parentElement instanceof HTMLButtonElement ? e.target.parentElement.id : e.target.parentElement.parentElement.id;
        navigate(`/photos/${id}/edit`);
    };

    const handleSort = (e) => {
        console.log(e.target.value);
        if (e.target.value === 'name') {
            setFilteredPhotos(photos.sort((a, b) => a.title.localeCompare(b.title)));
        } else {
            setFilteredPhotos(photos.sort((a, b) => a.album.localeCompare(b.album)));
        }
    }

    useEffect(() => {
        fetchPhotos();
    }, []);

    if (filteredPhotos.length === 0) return <div className='elements'>
        <Link to="/photos/create" ><FontAwesomeIcon icon={faPlus} className='add-btn' /></Link>
        <div className='search'>
            <h1>Photos</h1>
            <div className='search'>
                <FontAwesomeIcon icon={faSearch} className='search-icon' />
                <input type="text" value={query} onChange={handleQuery} placeholder='Search...' className='form-input search-input' />
            </div>
            <h1 className='no-results'>No photos matching your search</h1>
        </div>
    </div>;

    return (
        <div className='elements'>
            <Link to="/photos/create"><FontAwesomeIcon icon={faPlus} className='add-btn' /></Link>
            <h1>Photos</h1>
            <div className='actions'>
            <div className='sort'>
                <label htmlFor="sort">Sort by:</label>
                <select name="sort" id="sort" className='form-input sort-input' onChange={handleSort}>
                    <option value="name">title</option>
                    <option value="album">album</option>
                </select>
            </div>
            <div className='search'>
                <FontAwesomeIcon icon={faSearch} className='search-icon' />
                <input type="text" value={query} onChange={handleQuery} placeholder='Search...' className='form-input search-input'></input>            
            </div>
            </div>
            {
                filteredPhotos.map(photo => (
                    <div key={photo._id} className='item'>
                        <div className='texts'>
                            <div className='title' onClick={() => navigate(`/photos/${photo._id}`)}>
                                <div className='char'>{photo.title[0]}</div>
                                <h3>{photo.title}</h3>
                            </div>
                            <div className='photo' style={{ backgroundImage: `url(http://localhost:7001/${photo.link})`, backgroundSize: "cover", backgroundPosition: "center" }}></div>
                        </div>
                        <div className='btns'>
                            <button onClick={handleEdit} id={photo._id}><FontAwesomeIcon icon={faEdit} /></button>
                            <button onClick={handleDelete} id={photo._id}><FontAwesomeIcon icon={faTrash} /></button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Photos;