import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import Notification from "./Notification";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function EditBlog() {
  const [loaded, setLoaded] = useState(false);
  const [notification, setNotification] = useState({}); // State for notification

  const [apiData, setApiData] = useState({});

  const params = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // for getting the post data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://localhost:8000/" + params.id;
        const response = await axios.get(url);

        if (response.status === 200) {
          if (response?.data.statusText == "OK") {
            setApiData(response?.data?.blog_detail);
            setLoaded(true);
          }
        }
      } catch (error) {
        setLoaded(true);
      }
    };

    fetchData();
    return () => {};
  }, []);

  // submit the form data
  const saveForm = async (data, event) => {
    try {
      const url = "http://localhost:8000/" + params.id;
      const response = await axios.put(url, data);

      if (response.status === 200) {
        navigate("/", {
          state: { type: "success", message: "Blog edited successfully!" },
        }); // Redirect
      }
    } catch (error) {
      setNotification({ type: "error", message: "Server error, try later" });
      event.preventDefault();
      console.log(error.response);
    }
  };

  return (
    <div className="max-w-[1240px] flex flex-col items-center">
      <h1 className="text-xl md:text-4xl font-bold m-6 text-gray-800">
        Edit Blog
      </h1>
      {notification && ( // Render notification if it exists
        <Notification type={notification.type} message={notification.message} />
      )}
      {loaded && (
        <form action="" onSubmit={handleSubmit(saveForm)}>
          <label className="block font-bold pb-1">Title</label>
          <input
            defaultValue={apiData.title}
            className={`block border ${errors.title && "error"}`}
            {...register("title", {
              required: { value: true, message: "Title cannot be empty" },
              minLength: {
                value: 3,
                message: "Title should be minimum 3 characters",
              },
            })}
            type="text"
          />
          {errors.title && (
            <div className="error text-red-700">{errors.title.message}</div>
          )}
          <label className="block font-bold pt-3 pb-1">Content</label>
          <textarea
            defaultValue={apiData.post}
            className={`block border ${errors.post && "error"}`}
            {...register("post", {
              required: { value: true, message: "Content cannot be empty" },
            })}
          />
          {errors.post && (
            <div className="error text-red-700">{errors.post.message}</div>
          )}
          <button
            type="submit"
            className="border my-2 py-1 px-4 font-bold text-white bg-green-500"
          >
            Save
          </button>
        </form>
      )}
    </div>
  );
}
