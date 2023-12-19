import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const CreatePost = () => {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const post = {
            title: formData.get('title'),
            body: formData.get('body'),
            author: formData.get('author'),
            tags:[]
        };
        
       await axios.post("http://localhost:7001/api/posts",post).then(()=>{
        navigate('/posts');
       })
    };

    return (
        <div className="create-container">
            <Link to="/posts" ><FontAwesomeIcon icon={faRightFromBracket} /></Link>
            <h1 className="create--title">Create Post</h1>
            <form className="create-form" onSubmit={handleSubmit}>
                <div className="title-container">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" className="form-control" required />
                </div>
                <div className="body-container">
                    <label htmlFor="body">Body</label>
                    <textarea type="text" name="body" className="form-control body " required />
                </div>
                <div className="author-container">
                    <label htmlFor="author">Author</label>
                    <input type="text" name="author" className="form-control" required />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
    );
}

export default CreatePost;