import { Route } from "react-router-dom";
import Users from "./Users";
import CreateUser from "./CreateUser";
import SingleUser from "./SingleUser";
import UpdateUser from "./UpdateUser";

const UserRoutes = () => {
    return (
        <>
        <Route path="users" element={<Users />} />
        <Route path="users/create" element={<CreateUser />} />
        <Route path="users/:id" element={<SingleUser />} />
        <Route path="users/:id/edit" element={<UpdateUser />} />
        </>
    );
    }

export default UserRoutes;