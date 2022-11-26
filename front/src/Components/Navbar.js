import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context/Context";
export const Navbar = () => {
  const { user, dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.replace("/");
  };
  let image = user?.profilePicture
    ? `http://localhost:4000/images/${user.profilePicture}`
    : "https://picsum.photos/32/32/?random";
    if(user?.profilePicture == ""){
      image = "https://picsum.photos/32/32/?random"
    }
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            MERN BLOG
          </span>
        </Link>
        <div className="w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                aria-current="page"
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                aria-current="page"
              >
                ABOUT
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                aria-current="page"
              >
                CONTACT
              </Link>
            </li>
            {user && (
              <li>
                <Link
                  to="/write"
                  className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                  aria-current="page"
                >
                  WRITE
                </Link>
              </li>
            )}
            {!user && (
              <li>
                <Link
                  to="/login"
                  className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                  aria-current="page"
                >
                  LOGIN
                </Link>
              </li>
            )}
            {!user && (
              <li>
                <Link
                  to="/register"
                  className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                  aria-current="page"
                >
                  REGISTER
                </Link>
              </li>
            )}
            <li
              className=" cursor-pointer block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
              onClick={handleLogout}
            >
              {user && "LOGOUT"}
            </li>
          </ul>
        </div>
        <div>
          {user && (
            <ul>
              <li>
                <Link to="/settings">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={image}
                    alt="Rounded avatar"
                  />
                </Link>{" "}
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

