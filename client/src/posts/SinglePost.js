import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const SinglePost = () => {
    const [post, setPost] = useState([]);
    
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:7001/api/posts/${id}`);
            console.log('deleted');
            navigate('/posts');
        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = async () => {
        navigate(`/posts/${id}/edit`);
    };

    const fetchPost = async () => {
        try {
            const { data } = await axios.get(`http://localhost:7001/api/posts/${id}`);
            console.log(data);
            setPost(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [id]); // include id in the dependencies array

    if (!post) return <div>Loading...</div>;

    return (
        <div className="single-container">
            <Link to="/posts" ><FontAwesomeIcon icon={faRightFromBracket} /></Link>
            <div className='texts'>
                <div className='' >
                    <h1>{post.title}</h1>
                </div>
                <h3>{post.author}</h3>

                <p className='date'>{new Date(post.createdAt).toLocaleDateString()}</p>
                <p className='description'>{post.body}</p>
            </div>
            <div className='tags'>
            {post && post.tags && post.tags.map(tag =>
                <span className='tag' key={tag}>  #{tag}  </span>)}
            </div>

            <div className='btns'>
                <button onClick={handleDelete} id={post._id}><FontAwesomeIcon icon={faTrash} /> Delete</button>
                <button onClick={handleEdit} id={post._id}><FontAwesomeIcon icon={faEdit} /> Edit</button>
            </div>
        </div>
    );
}

export default SinglePost;