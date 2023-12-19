import { Route} from "react-router-dom";
import Posts from "./Posts";
import CreatePost from "./CreatePost";
import SinglePost from "./SinglePost";
import UpdatePost from "./UpdatePost";

const PostRoutes = () => {
    return (
        <>
        <Route path="posts" element={<Posts />} />
        <Route path="posts/create" element={<CreatePost />} />
        <Route path="posts/:id" element={<SinglePost />} />
        <Route path="posts/:id/edit" element={<UpdatePost />} />
        </>
    );
    }

export default PostRoutes;