import {FiHeart} from 'react-icons/fi'
import {AiOutlineShoppingCart, AiOutlineUserAdd} from "react-icons/ai";

import "./Nav.css";

function Nav() {
  return (
    <nav>
      <div className="nav-container">
        <input type="text" className="search-input" placeholder="Enter your search Cage"/>
      </div>

      <div className="profile-container">
        <a href="#"> 
        <FiHeart className="nav-icons"/>
        </a>

        <a href="">
          <AiOutlineShoppingCart className="nav-icons"/>
        </a>

        <a href="">
          <AiOutlineUserAdd className="nav-icons"/>
        </a>
      </div>
    </nav>
  )
}

export default Nav;