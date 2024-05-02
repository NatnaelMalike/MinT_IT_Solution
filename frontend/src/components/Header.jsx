import { Link } from "react-router-dom"
import logo from '../assets/img/MinT-Logo.jpg'
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
        <Link to={'/login'} className="items-center flex-shrink-0 hidden lg:flex">
			<button className="px-8 py-3 font-semibold rounded bg-teal-800 text-white">Log Out</button>
		</Link>
		<button className="flex justify-end p-4 md:hidden">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
			</svg>
		</button>
	</div>
</header>
  )
}

export default Header