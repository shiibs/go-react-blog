import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function DeleteBlog() {
  const params = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const respose = await axios.delete(`http://localhost:8000/${params.id}`);

      if (respose.status === 200) {
        navigate("/", {
          state: { type: "success", message: "Blog deleted successfully!" },
        }); // Redirect
      }
    } catch {
      console.log("error", error);
    }
  };
  return (
    <div>
      <div className="flex justify-center">
        <div>
          <h1 className="text-2xl">Are you sure you want to delete the blog</h1>
          <div className="flex justify-center">
            <button
              onClick={handleDelete}
              className="border my-2 py-1 px-4 font-bold text-white bg-green-500"
            >
              Procced
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
