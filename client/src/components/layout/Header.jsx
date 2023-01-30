import { message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("user"));
    console.log(users);
    if (users) {
      setLoginUser(users);
    }
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" to="/">
          Expense<span className="text-success">Management</span>
        </Link>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav ms-auto mx-2">
            <li className="text-white my-1 mx-2">
              <p classNameName="nav-link  ">{loginUser && loginUser.name}</p>
            </li>
            <li>
              <button
                className="btn btn-primary my-2 my-sm-0"
                onClick={() => {
                  localStorage.removeItem("user");
                  message.success("Logged out");

                  navigate("/login");
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

// complete
export default Header;
