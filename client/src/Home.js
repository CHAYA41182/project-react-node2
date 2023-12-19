import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to our Management System</h1>
            <p>This system allows you to manage tasks, posts, users, and photos.</p>
            <Link to="/todos/create">Create a new task</Link>
            <Link to="/posts/create">Create a new post</Link>
            <Link to="/users/create">Create a new user</Link>
            <Link to="/photos/create">Create a new photo</Link>
            
        </div>
    );
}

export default Home;