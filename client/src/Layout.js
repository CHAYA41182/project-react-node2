import { Outlet } from "react-router-dom";
import Menue from "./Menu";

const Layout = () => {
    return <div className="page" >
        <Menue  />
        <Outlet width="auto" className="outlet" />
    </div>
};

export default Layout;