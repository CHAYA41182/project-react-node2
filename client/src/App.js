import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Todos from './todos/Todos';
import Users from './users/Users';
import Posts from './posts/Posts';
import Photos from './photos/Photos';
import CreateUser from './users/CreateUser';
import CreatePost from './posts/CreatePost';
import CreatePhoto from './photos/CreatePhoto';
import CreateTodo from './todos/CreateTodo';
import SinglePost from './posts/SinglePost';
import SinglePhoto from './photos/SinglePhoto';
import SingleTodo from './todos/SingleTodo';
import SingleUser from './users/SingleUser';
import UpdatePost from './posts/UpdatePost';
import UpdatePhoto from './photos/UpdatePhoto';
import UpdateTodo from './todos/UpdateTodo';
import UpdateUser from './users/UpdateUser';
import Home from './Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="todos" element={<Todos />} />
          <Route path="users" element={<Users />} />
          <Route path="posts" element={<Posts />} />
          <Route path="photos" element={<Photos />} />
          <Route path="users/create" element={<CreateUser />} />
          <Route path="posts/create" element={<CreatePost />} />
          <Route path="photos/create" element={<CreatePhoto />} />
          <Route path="todos/create" element={<CreateTodo />} />
          <Route path="posts/:id" element={<SinglePost />} />
          <Route path="photos/:id" element={<SinglePhoto />} />
          <Route path="todos/:id" element={<SingleTodo />} />
          <Route path="users/:id" element={<SingleUser />} />
          <Route path="posts/:id/edit" element={<UpdatePost />} />
          <Route path="photos/:id/edit" element={<UpdatePhoto />} />
          <Route path="todos/:id/edit" element={<UpdateTodo />} />
          <Route path="users/:id/edit" element={<UpdateUser />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;