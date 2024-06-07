import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setUser } from "../services/store/reducers/AuthSlice";

export default function Login() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const saveForm = async (data) => {
    console.log(data);

    try {
      const apiUrl = "http://localhost:8002/login";

      const response = await axios.post(apiUrl, data);

      if (response.status === 200) {
        const data = await response.data;
        console.log(data);

        localStorage.setItem("token", data.token);

        dispatch(setUser(data.user));

        navigate("/", {
          state: { type: "success", message: data.msg },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-[1240px] flex flex-col items-center">
      <h1 className="text-2xl py-6">Login to your account</h1>
      <form name="loginForm" onSubmit={handleSubmit(saveForm)}>
        <label className="block">Email</label>
        <input
          className={`block border ${errors.title && "error"}`}
          {...register("email", {
            required: { value: true, message: "Email cannot be empty" },
          })}
          type="email"
        />
        {errors.title && (
          <div className="error text-red-700">{errors.email.message}</div>
        )}
        <label className="block mt-2">Password</label>
        <input
          type="password"
          className={`block border ${errors.post && "error"}`}
          {...register("password", {
            required: { value: true, message: "Password cannot be empty" },
          })}
        />
        {errors.post && (
          <div className="error text-red-700">{errors.password.message}</div>
        )}

        <button
          type="submit"
          className="border px-4 py-1 my-4 bg-green-500 text-white font-bold"
        >
          Login
        </button>
      </form>
    </div>
  );
}
