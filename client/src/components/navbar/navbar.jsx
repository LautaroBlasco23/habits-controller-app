import { Link } from "react-router-dom";

function Navbar () {
    return( 
        <nav>
        <ul className="flex flex-row justify-around justify-items-center w-full border-white bg-neutral-900 rounded">
          <li className="basis-1/4 py-6 text-gray-400 justify-center flex">
            <Link to="/" className="hover:text-white">Habits</Link>
          </li>
          <li className="basis-1/4 py-6 text-gray-400  justify-center flex">
            {localStorage.getItem("token") == null ? 
            <Link to="/auth/login" className="hover:text-white">LOG IN</Link>
            : 
            <Link to="/user" className="hover:text-white">My profile</Link>
            }
          </li>
        </ul>
      </nav>
    )
}

export default Navbar;