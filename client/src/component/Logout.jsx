import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../services/store/reducers/AuthSlice";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    // Remove token
    window.localStorage.removeItem("token");

    // Remove user from redux store
    dispatch(logout());

    navigate("/", {
      state: { type: "success", message: "Logged out" },
    });
  }, []);

  return (
    <div>
      <button>Logout</button>
    </div>
  );
}
