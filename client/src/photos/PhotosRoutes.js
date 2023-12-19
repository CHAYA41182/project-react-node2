import { Route } from "react-router-dom";
import Photos from "./Photos";
import CreatePhoto from "./CreatePhoto";
import SinglePhoto from "./SinglePhoto";
import UpdatePhoto from "./UpdatePhoto";

const PhotosRoutes = () => {
    return (
        <>
        <Route path="photos" element={<Photos />} />
        <Route path="photos/create" element={<CreatePhoto />} />
        <Route path="photos/:id" element={<SinglePhoto />} />
        <Route path="photos/:id/edit" element={<UpdatePhoto />} />
        </>
    );
    }

export default PhotosRoutes;