import { Outlet } from "react-router-dom";
import Menue from "./Menu";

const Layout = () => {
    return <div className="page" >
        <Menue minWidth='20%' />
        <Outlet width="auto" />
    </div>
};

export default Layout;