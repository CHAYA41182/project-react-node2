import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const CreatePhoto = () => {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const photo = {
            title: formData.get('title'),
            link: formData.get('link'),
            album: formData.get('album'),
        };
        
       await axios.post("http://localhost:7001/api/photos",photo).then(()=>{
        navigate('/photos');
       })
    };

    return (
        <div className="create-container">
            <Link to="/photos" ><FontAwesomeIcon icon={faRightFromBracket} /></Link>
            <h1 className="create--title">Create Photo</h1>
            <form className="create-form" onSubmit={handleSubmit}>
                <div className="title-container">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" className="form-control" required />
                </div>
                <div className="link-container">
                    <label htmlFor="link">Link</label>
                    <input type="text" name="link" className="form-control" required />
                </div>
                <div className="album-container">
                    <label htmlFor="album">Album</label>
                    <input type="text" name="album" className="form-control" required />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
    );
}

export default CreatePhoto;