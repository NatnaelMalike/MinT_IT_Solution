import Header from "./Header";
import { Outlet } from "react-router-dom";
const Main = () => {
    return (
        <div className="flex flex-col">
            <Header />
            <div className="grow bg-white p-6" id="main">
                <Outlet />
            </div>
        </div>
    );
};

export default Main;
