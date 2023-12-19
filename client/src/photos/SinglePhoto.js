import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const SinglePhoto = () => {
    const navigate = useNavigate();
    const [photo, setPhoto] = useState([]);
    const { id } = useParams();

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:7001/api/photos/${id}`);
            console.log('deleted');
            navigate('/photos');
        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = () => {
        navigate(`/photos/${id}/edit`);
    };

    useEffect(() => {
        const fetchPhoto = async () => {
            try {
                const { data } = await axios.get(`http://localhost:7001/api/photos/${id}`);
                console.log(data);
                setPhoto(data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchPhoto();
    }, [id]); // include id in the dependencies array

    if (!photo) return <div>Loading...</div>;

    return (
        <div className="single-container">
            <Link to="/photos" ><FontAwesomeIcon icon={faRightFromBracket} /></Link>
            <div className='texts'>
                <div className='title'>
                    <h1>{photo.title}</h1>
                </div>
                <img src={`http://localhost:7001/${photo.link}`} alt={photo.title} className='big-poto' />
                <h5 className='description'>{photo.album}</h5>
            </div>
            <div className='btns'>
                <button onClick={handleDelete} id={photo._id}><FontAwesomeIcon icon={faTrash} /> Delete</button>
                <button onClick={handleEdit} id={photo._id}><FontAwesomeIcon icon={faEdit} /> Edit</button>
            </div>
        </div>
    );
}

export default SinglePhoto;