import Header from "../Header"
import { Outlet } from "react-router-dom"
const Main = () => {
  return (
    <div className="flex flex-col grow">
        <Header />
        <div className="grow" id="main">
                <Outlet />
            </div>
    </div>
  )
}

export default Main