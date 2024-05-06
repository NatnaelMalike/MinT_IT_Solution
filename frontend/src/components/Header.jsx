import { Link } from "react-router-dom"
import logo from '../assets/img/MinT-Logo.jpg'
import { Button } from "./ui/button"
const Header = () => {
  return (
    <header className="p-4">
	<div className="container flex justify-between h-16 mx-auto items-center">
		<Link to={'/'}>
            <img src={logo} alt="" className="w-24"/>
        </Link>
		<ul className="hidden space-x-3 md:flex gap-6">
			<Link to={'/'} className="text-xl ">Home</Link>
            <Link to={'/'} className="text-xl ">About</Link>
            <Link to={'/'} className="text-xl ">Requests</Link>
            <Link to={'/'} className="text-xl ">Contact</Link>
		</ul>
        
		<Button>Logout</Button>
	</div>
</header>
  )
}

export default Header