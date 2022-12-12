import { Link } from "react-router-dom";

function Navbar () {
    return( 
        <nav>
        <ul>
          <li>
            <Link to="/">Habits</Link>
          </li>
          <li>
            {localStorage.getItem("usertoken") == null ? 
            <Link to="/auth">LOG IN</Link>
            : 
            <Link to="/auth">LOG OUT</Link>
            }
          </li>
          <li>
            {localStorage.getItem("usertoken") == null ? 
            <div></div>
            : 
            <Link to="/user">My profile</Link>
            }
          </li>
        </ul>
      </nav>
    )
}

export default Navbar;