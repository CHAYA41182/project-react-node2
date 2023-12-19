import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const UpdatePhoto = () => {
    const navigate = useNavigate();
    const [photo, setPhoto] = useState([]);

    const {id} = useParams()

    const getPhoto = async () => {
        try {
            const { data } = await axios.get(`http://localhost:7001/api/photos/${id}`) 
            setPhoto(data)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getPhoto()
    }, [])

    const titleRef = useRef();
    const linkRef = useRef();
    const albumRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const photo = {
            title: titleRef.current.value,
            link: linkRef.current.value,
            album: albumRef.current.value,
        };
        
       await axios.put(`http://localhost:7001/api/photos/${id}`,photo).then(()=>{
        navigate(`/photos/${id}`);
       })
    };

    return (
        <div className="create-container">
            <Link to={`/photos/${id}`} ><FontAwesomeIcon icon={faRightFromBracket} /></Link>
            <h1 className="create--title">Update Photo</h1>
            <form className="create-form" onSubmit={handleSubmit}>
                <div className="title-container">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" className="form-control" required ref={titleRef} defaultValue={photo.title}/>
                </div>
                <div className="link-container">
                    <label htmlFor="link">Link</label>
                    <input type="text" name="link" className="form-control" required ref={linkRef} defaultValue={photo.link}/>
                </div>
                <div className="album-container">
                    <label htmlFor="album">Album</label>
                    <input type="text" name="album" className="form-control" required ref={albumRef} defaultValue={photo.album}/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    );
}

export default UpdatePhoto;