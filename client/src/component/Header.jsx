import React from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
export default function Header() {
  const { loggedIn, user } = useSelector((state) => state.auth);

  return (
    <div>
      <div className="w-full bg-slate-600 p-8">
        <h1 className="text-center font-bold text-white md:text-2xl ">
          React Application with Go fiber Backend
        </h1>
      </div>
      <div className="flex justify-between">
        <div className="p-6 ml-10 flex flex-row gap-8 font-bold text-gray-800">
          <Link to="/">Home</Link>
          {/* <Link to="add">Blog</Link> */}

          <div className=" items-end">
            <Link
              to="add"
              className="border  p-2 pl-8 pr-8 rounded-md text-whit hover:shadow-lg text-white bg-green-500 transition duration-300 ease-in-out transform hover:-translate-z-1"
            >
              Add Blog+
            </Link>
          </div>
        </div>
        <div className="p-6 font-bold">
          {loggedIn ? (
            <>
              {user.email}{" "}
              <Link to="/logout" className="px-3">
                Logout
              </Link>{" "}
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
}
