import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import Notification from "./Notification";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

export default function AddBlog() {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({}); // State for notification

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const saveForm = async (data, event) => {
    setLoading(true);

    data.file = data.image[0];
    data.image = null;
    try {
      const url = "http://localhost:8000";
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        setLoading(false); // Set loading to false
        navigate("/", {
          state: { type: "success", message: "Blog submitted successfully!" },
        }); // Redirect after a delay
      }
    } catch (error) {
      setNotification({ type: "error", message: "Server error, try again" });
      setLoading(false); // Set loading to false
      event.preventDefault();
      console.log(error.response);
    }
  };

  return (
    <div className="max-w-[1240px] flex flex-col items-center">
      <h1 className="text-xl md:text-4xl font-bold m-6 text-gray-800">
        Add a new Blog
      </h1>
      {loading && <Spinner />} {/* Render spinner if loading */}
      {notification && ( // Render notification if it exists
        <Notification type={notification.type} message={notification.message} />
      )}
      <form action="" onSubmit={handleSubmit(saveForm)}>
        <label className="block">Title</label>
        <input
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
        <label className="block mt-2">Content</label>
        <textarea
          className={`block border ${errors.post && "error"}`}
          {...register("post", {
            required: { value: true, message: "Content cannot be empty" },
          })}
        />
        {errors.post && (
          <div className="error text-red-700">{errors.post.message}</div>
        )}

        <label className="block mt-2">Image</label>
        <input
          className={`block border ${errors.image && "error"}`}
          type="file"
          {...register("image")}
        />

        <button
          type="submit"
          className="border px-4 py-1 my-4 bg-green-500 text-white font-bold"
        >
          Save
        </button>
      </form>
    </div>
  );
}
