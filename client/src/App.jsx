import React, { useEffect } from "react";
import Header from "./component/Header";
import Blogs from "./component/Blogs";

import { Routes, Route } from "react-router-dom";
import BlogDetail from "./component/BlogDetail";
import AddBlog from "./component/AddBlog";
import EditBlog from "./component/EditBlog";
import DeleteBlog from "./component/DeleteBlog";
import Footer from "./component/Footer";
import Login from "./component/Login";
import axios from "axios";
import Logout from "./component/Logout";

function App() {
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    const timestamp = 1000 * 60 * 60 - 5;

    let interval = setInterval(() => {
      if (token !== null) {
        updateToken();
      }
    }, timestamp);

    return () => {
      clearInterval(interval);
    };
  }, [token]);

  const updateToken = async () => {
    try {
      const apiUrl = "http://localhost:8002/private/refreshtoken";

      const response = await axios.get(apiUrl, {
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });

      if (response.status === 200) {
        const data = await response.data;

        window.localStorage.setItem("token", data.token);
      }
    } catch (error) {
      console.log(error);

      window.localStorage.removeItem("token");
    }
  };

  return (
    <Routes>
      <Route path="/" element={[<Header />, <Blogs />, <Footer />]} />
      <Route
        path="/blog/:id"
        element={[<Header />, <BlogDetail />, <Footer />]}
      />
      <Route path="/add" element={[<Header />, <AddBlog />, <Footer />]} />
      <Route
        path="/blog/edit/:id"
        element={[<Header />, <EditBlog />, <Footer />]}
      />
      <Route
        path="/blog/delete/:id"
        element={[<Header />, <DeleteBlog />, <Footer />]}
      />
      <Route path="/login" element={[<Header />, <Login />, <Footer />]} />
      <Route path="/logout" element={[<Header />, <Logout />, <Footer />]} />
    </Routes>
  );
}

export default App;
