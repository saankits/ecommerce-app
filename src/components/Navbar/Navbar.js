import React from "react";
import logo from "../logo.svg";
import "./navbar.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div
        className="header"
        style={{ width: "100%", height: "50px", backgroundColor: "#85b2f57a" }}
      >
        <span className="left">
          <Link to="/home"><img src={logo} alt="logo" /></Link>
        </span>
        <span className="right">
          {sessionStorage.getItem("username") ? <span className="userlogo">
            <i class="fa-solid fa-user"></i> &nbsp; {sessionStorage.getItem("username")}
            </span> : <span>{""}</span>}
          <span>
            <Link to="/cart">
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
          </span>
        </span>
      </div>
    </div>
  );
};

export default Header;
