import { Outlet } from "react-router-dom";
import Header from "./Header";
const Main = () => {
    return (
        <div className="flex flex-col">
            <Header />
            <div className="p-8" id="main">
                <Outlet />
            </div>
        </div>
    );
};

export default Main;
