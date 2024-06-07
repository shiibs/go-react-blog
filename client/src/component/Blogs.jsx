import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Notification from "./Notification";

import { Link, useLocation } from "react-router-dom";
import Spinner from "./Spinner";

export default function Blogs() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://localhost:8000";
        const response = await axios.get(url);

        if (response.status === 200) {
          if (response?.data.statusText == "OK") {
            setApiData(response.data["blog_records"]);
          }
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.response);
      }
    };

    fetchData();
    return () => {};
  }, []);

  useEffect(() => {
    if (location.state) {
      // Show the notification
      setTimeout(() => {
        // Reset location state after 3 seconds
        history.replace({
          ...history.location,
          state: null,
        });
      }, 3000);
    }
  }, [location.state]);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div>
        {location.state && (
          <Notification
            type={location.state.type}
            message={location.state.message}
          />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  p-8 mx-10 ">
          {apiData &&
            apiData.map((record) => (
              <div
                key={record.id}
                className="col-span-1 shadow-md hover:shadow-lg rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                <div className="bg-white shadow-md">
                  <Link to={`/blog/${record.id}`}>
                    <h1 className="text-xl font-bold mb-2 hover:underline text-center">
                      {record.title}
                    </h1>
                  </Link>

                  <p className="p-8 text-center">{record.post}</p>
                  <div className="flex justify-center gap-2 pb-3">
                    <Link to={`/blog/edit/${record.id}`}>
                      <FaEdit className="text-blue-500 size-6" />
                    </Link>
                    <Link to={`/blog/delete/${record.id}`}>
                      <FaTrashAlt className="text-blue-500 size-6" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
