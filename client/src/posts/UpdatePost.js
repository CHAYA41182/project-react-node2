import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const UpdatePost = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [post, setPost] = useState([]);

    const fetchPost = async () => {
        try {
            const { data } = await axios.get(`http://localhost:7001/api/posts/${id}`)
            setPost(data)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchPost();
    }, [id]);

    const titleRef = useRef();
    const bodyRef = useRef();
    const authorRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPost = {
            title: titleRef.current.value,
            body: bodyRef.current.value,
            author: authorRef.current.value,
            tags: post.tags
        };

        await axios.put(`http://localhost:7001/api/posts/${id}`, newPost).then(() => {
            navigate('/posts');
        })
    };

    return (
        <div className="create-container">
            <Link to="/posts" ><FontAwesomeIcon icon={faRightFromBracket} /></Link>
            <h1 className="create--title">Update Post</h1>
            <form className="create-form" onSubmit={handleSubmit}>
                <div className="title-container">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        required
                        defaultValue={post.title}
                        ref={titleRef}
                    />
                </div>
                <div className="body-container">
                    <label htmlFor="body">Body</label>
                    <textarea
                        type="text"
                        name="body"
                        className="form-control body"
                        required
                        defaultValue={post.body}
                        ref={bodyRef}
                    />
                </div>
                <div className="author-container">
                    <label htmlFor="author">Author</label>
                    <input
                        type="text"
                        name="author"
                        className="form-control"
                        defaultValue={post.author}
                        ref={authorRef}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdatePost;